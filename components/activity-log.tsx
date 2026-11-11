"use client"

import { useEffect, useRef, useState } from "react"

type ActivityEntry = { at: string; event: string; durationMs?: number }
type ActivityResponse = { entries: ActivityEntry[]; totalOpenTimeMs: number }

const SESSION_KEY = "portfolio-activity-session-start-v1"

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
}

function sendEvent(event: string, durationMs?: number, keepalive = false) {
  return fetch("/api/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...(durationMs ? { durationMs } : {}) }),
    keepalive,
  })
}

export function ActivityTracker() {
  const didRecordAccess = useRef(false)

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, String(Date.now()))
    if (!didRecordAccess.current) {
      void sendEvent("System accessed", undefined, true)
      didRecordAccess.current = true
    }

    let isVisible = true
    const recordSessionTime = (keepalive = false) => {
      if (!isVisible) return
      const startedAt = Number(sessionStorage.getItem(SESSION_KEY))
      const elapsed = startedAt ? Math.max(0, Date.now() - startedAt) : 0
      isVisible = false
      if (elapsed > 0) void sendEvent("System open time updated", elapsed, keepalive)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") recordSessionTime(true)
      else if (!isVisible) {
        isVisible = true
        sessionStorage.setItem(SESSION_KEY, String(Date.now()))
      }
    }
    const onPageHide = () => recordSessionTime(true)
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const element = target.closest("a, button")
      if (!element) return

      const explicitEvent = element.getAttribute("data-activity-event")
      if (explicitEvent) {
        void sendEvent(explicitEvent, undefined, true)
        return
      }

      if (element instanceof HTMLAnchorElement) {
        const href = element.href.toLowerCase()
        if (href.includes("github.com")) void sendEvent("GitHub clicked", undefined, true)
        else if (href.includes("linkedin.com")) void sendEvent("LinkedIn clicked", undefined, true)
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("pagehide", onPageHide)
    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pagehide", onPageHide)
      document.removeEventListener("click", onClick, true)
    }
  }, [])

  return null
}

export function ActivityLogDownload() {
  async function downloadLog() {
    const response = await fetch("/api/activity", { cache: "no-store" })
    if (!response.ok) return
    const { entries, totalOpenTimeMs } = (await response.json()) as ActivityResponse
    const currentSessionStart = Number(sessionStorage.getItem(SESSION_KEY))
    const currentSessionMs = currentSessionStart ? Math.max(0, Date.now() - currentSessionStart) : 0
    const lines = [
      "PORTFOLIO SYSTEM ACTIVITY LOG",
      `Generated: ${new Date().toLocaleString()}`,
      `Total time system was open: ${formatDuration(totalOpenTimeMs + currentSessionMs)}`,
      "",
      "EVENTS",
      ...entries.map(({ at, event, durationMs }) =>
        `${new Date(at).toLocaleString()} - ${event}${durationMs ? ` (${formatDuration(durationMs)})` : ""}`,
      ),
      "",
    ]
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "portfolio-activity-log.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button type="button" onClick={downloadLog} className="text-xs font-mono uppercase tracking-wider underline underline-offset-4 opacity-80 transition hover:opacity-100">
      Download activity log (.txt)
    </button>
  )
}

export function ActivityLogViewer() {
  const [data, setData] = useState<ActivityResponse | null>(null)
  const [error, setError] = useState(false)
  const [currentSessionMs, setCurrentSessionMs] = useState(0)

  useEffect(() => {
    const updateDuration = () => {
      const startedAt = Number(sessionStorage.getItem(SESSION_KEY))
      setCurrentSessionMs(startedAt ? Math.max(0, Date.now() - startedAt) : 0)
    }
    updateDuration()
    const durationTimer = window.setInterval(updateDuration, 1000)
    const loadLog = () => fetch("/api/activity", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load the activity log")
        setData((await response.json()) as ActivityResponse)
        setError(false)
      })
      .catch(() => setError(true))
    void loadLog()
    const refreshTimer = window.setInterval(() => void loadLog(), 5000)
    return () => {
      window.clearInterval(durationTimer)
      window.clearInterval(refreshTimer)
    }
  }, [])

  if (error) return <p className="text-sm text-muted-foreground">Could not load the server activity log.</p>
  if (!data) return <p className="text-sm text-muted-foreground">Loading activity log…</p>

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Total time open: <span className="font-mono text-foreground">{formatDuration(data.totalOpenTimeMs + currentSessionMs)}</span></p>
      {data.entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <ol className="divide-y divide-border border-y border-border">
          {data.entries.map((entry, index) => (
            <li key={`${entry.at}-${index}`} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-sm">{entry.event}{entry.durationMs ? ` · ${formatDuration(entry.durationMs)}` : ""}</span>
              <time className="font-mono text-xs text-muted-foreground" dateTime={entry.at}>{new Date(entry.at).toLocaleString()}</time>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
