"use client"

import { useEffect, useRef, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ActivityEntry = { _id?: string; at: string; event: string; durationMs?: number; deviceDetails?: string; location?: string }
type ActivityResponse = { entries: ActivityEntry[]; totalOpenTimeMs: number }
type AnalyticsPeriod = "daily" | "weekly" | "monthly" | "yearly"

const ACTIONS = ["System accessed", "GitHub clicked", "LinkedIn clicked", "View CV clicked", "CV downloaded"] as const

const SESSION_KEY = "portfolio-activity-session-start-v1"

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
}

function startOfWeek(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return start
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function periodKey(date: Date, period: AnalyticsPeriod) {
  if (period === "daily") return dateKey(date)
  if (period === "weekly") return dateKey(startOfWeek(date))
  if (period === "monthly") return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  return String(date.getFullYear())
}

function getAnalyticsRows(entries: ActivityEntry[], period: AnalyticsPeriod) {
  const now = new Date()
  const count = period === "daily" ? 7 : period === "weekly" ? 8 : period === "monthly" ? 12 : 5
  const currentStart = period === "daily"
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
    : period === "weekly"
      ? startOfWeek(now)
      : period === "monthly"
        ? new Date(now.getFullYear(), now.getMonth(), 1)
        : new Date(now.getFullYear(), 0, 1)
  const starts = Array.from({ length: count }, (_, index) => {
    const date = new Date(currentStart)
    if (period === "daily") date.setDate(date.getDate() - (count - index - 1))
    if (period === "weekly") date.setDate(date.getDate() - (count - index - 1) * 7)
    if (period === "monthly") date.setMonth(date.getMonth() - (count - index - 1))
    if (period === "yearly") date.setFullYear(date.getFullYear() - (count - index - 1))
    return date
  })
  const rows = starts.map((start) => ({
    key: periodKey(start, period),
    label: period === "daily"
      ? start.toLocaleDateString(undefined, { month: "short", day: "numeric" })
      : period === "weekly"
        ? `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
        : period === "monthly"
          ? start.toLocaleDateString(undefined, { month: "long", year: "numeric" })
          : String(start.getFullYear()),
    counts: Object.fromEntries(ACTIONS.map((action) => [action, 0])) as Record<(typeof ACTIONS)[number], number>,
    total: 0,
    openTimeMs: 0,
  }))
  const byKey = new Map(rows.map((row) => [row.key, row]))

  for (const entry of entries) {
    const row = byKey.get(periodKey(new Date(entry.at), period))
    if (!row) continue
    if (entry.event === "System open time updated") {
      row.openTimeMs += entry.durationMs ?? 0
    } else if (ACTIONS.includes(entry.event as (typeof ACTIONS)[number])) {
      row.counts[entry.event as (typeof ACTIONS)[number]] += 1
      row.total += 1
    }
  }

  return rows.reverse()
}

function ActionAnalytics({ entries, period }: { entries: ActivityEntry[]; period: AnalyticsPeriod }) {
  const rows = getAnalyticsRows(entries, period)
  const chartRows = rows.map((row) => ({ period: row.label, ...row.counts }))
  const actionLabels: Record<(typeof ACTIONS)[number], string> = {
    "System accessed": "Accesses",
    "GitHub clicked": "GitHub",
    "LinkedIn clicked": "LinkedIn",
    "View CV clicked": "View CV",
    "CV downloaded": "CV downloads",
  }

  return (
    <div className="h-[360px] w-full" role="img" aria-label={`Bar chart showing action counts by ${period}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartRows} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="period" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.6 }}
            contentStyle={{ backgroundColor: "var(--popover)", borderColor: "var(--border)", borderRadius: 12, color: "var(--popover-foreground)" }}
            labelStyle={{ color: "var(--popover-foreground)" }}
          />
          <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12 }} />
          {ACTIONS.map((action, index) => (
            <Bar key={action} dataKey={action} name={actionLabels[action]} fill={`var(--chart-${index + 1})`} radius={[3, 3, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
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
    const recordSessionTime = () => {
      if (!isVisible) return
      isVisible = false
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") recordSessionTime()
      else if (!isVisible) {
        isVisible = true
        sessionStorage.setItem(SESSION_KEY, String(Date.now()))
      }
    }
    const onPageHide = () => recordSessionTime()
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
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [analyticsPeriod, setAnalyticsPeriod] = useState<AnalyticsPeriod>("daily")

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

  const totalRows = data.entries.length
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize))
  const currentPage = Math.min(page, pageCount - 1)
  const firstRow = totalRows === 0 ? 0 : currentPage * pageSize + 1
  const lastRow = Math.min((currentPage + 1) * pageSize, totalRows)
  const visibleEntries = data.entries.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Total time open: <span className="font-mono text-foreground">{formatDuration(data.totalOpenTimeMs + currentSessionMs)}</span></p>
      {data.entries.length > 0 && (
        <section aria-label="Action analytics" className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Action analytics</h2>
            <p className="mt-1 text-sm text-muted-foreground">Counts for each action across recent time periods.</p>
          </div>
          <Tabs value={analyticsPeriod} onValueChange={(value) => setAnalyticsPeriod(value as AnalyticsPeriod)}>
            <TabsList aria-label="Analytics time period" className="w-full sm:w-fit">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            {(["daily", "weekly", "monthly", "yearly"] as const).map((period) => (
              <TabsContent key={period} value={period} className="mt-4">
                <ActionAnalytics entries={data.entries} period={period} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
      )}
      {data.entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Rows per page
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value))
                  setPage(0)
                }}
                className="rounded-md border border-border bg-background px-2 py-1 text-foreground"
              >
                {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
            </label>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">{firstRow}–{lastRow} of {totalRows}</span>
              <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 0} className="rounded-md border border-border px-3 py-1.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= pageCount - 1} className="rounded-md border border-border px-3 py-1.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </div>
          </div>
          <Table>
            <TableCaption>Most recent events first. Location is estimated from the visitor’s IP region.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Approx. location</TableHead>
                <TableHead>Open time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleEntries.map((entry, index) => (
                <TableRow key={entry._id ?? `${entry.at}-${index}`}>
                  <TableCell><time className="font-mono text-xs text-muted-foreground" dateTime={entry.at}>{new Date(entry.at).toLocaleString()}</time></TableCell>
                  <TableCell>{entry.event}</TableCell>
                  <TableCell>{entry.deviceDetails ?? "Unavailable"}</TableCell>
                  <TableCell>{entry.location ?? "Unavailable"}</TableCell>
                  <TableCell className="font-mono">{entry.durationMs ? formatDuration(entry.durationMs) : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}
