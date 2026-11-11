import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const activityEvents = [
  "System accessed",
  "GitHub clicked",
  "LinkedIn clicked",
  "View CV clicked",
  "CV downloaded",
  "System open time updated",
] as const
type ActivityEvent = (typeof activityEvents)[number]

function isActivityEvent(value: unknown): value is ActivityEvent {
  return typeof value === "string" && activityEvents.some((event) => event === value)
}

function getConvexClient() {
  const url = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) throw new Error("Set CONVEX_URL to your Convex deployment URL.")
  return new ConvexHttpClient(url)
}

function getDeviceDetails(userAgent: string | null) {
  const ua = userAgent ?? ""
  const device = /ipad|tablet|kindle|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))
    ? "Tablet"
    : /mobile|iphone|ipod|android/i.test(ua)
      ? "Mobile"
      : "Desktop"
  const browser = /edg\//i.test(ua) ? "Edge"
    : /opr\//i.test(ua) ? "Opera"
      : /firefox|fxios/i.test(ua) ? "Firefox"
        : /chrome|crios/i.test(ua) ? "Chrome"
          : /safari/i.test(ua) ? "Safari"
            : "Unknown browser"
  const operatingSystem = /windows/i.test(ua) ? "Windows"
    : /android/i.test(ua) ? "Android"
      : /iphone|ipad|ipod/i.test(ua) ? "iOS"
        : /macintosh|mac os/i.test(ua) ? "macOS"
          : /linux/i.test(ua) ? "Linux"
            : "Unknown OS"
  return `${device} · ${operatingSystem} · ${browser}`
}

function getLocation(request: Request) {
  const headers = request.headers
  const cityHeader = headers.get("x-vercel-ip-city") || headers.get("cf-ipcity")
  let city = cityHeader
  if (cityHeader) {
    try {
      city = decodeURIComponent(cityHeader)
    } catch {
      city = cityHeader
    }
  }
  const region = headers.get("x-vercel-ip-country-region") || headers.get("cf-region")
  const country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry")
  const parts = [city, region, country].filter(Boolean)
  return parts.length ? parts.join(", ") : "Unavailable"
}

export async function GET() {
  try {
    const log = await getConvexClient().query(api.activity.getActivityLog, {})
    return NextResponse.json({
      ...log,
      entries: log.entries.map((entry) => ({ ...entry, at: new Date(entry.at).toISOString() })),
    })
  } catch {
    return NextResponse.json({ error: "Could not read the Convex activity log." }, { status: 503 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { event?: unknown; durationMs?: unknown }
    if (!isActivityEvent(body.event)) {
      return NextResponse.json({ error: "Invalid activity event." }, { status: 400 })
    }

    const durationMs = typeof body.durationMs === "number" && Number.isFinite(body.durationMs)
      ? Math.max(0, Math.min(body.durationMs, 24 * 60 * 60 * 1000))
      : undefined
    await getConvexClient().mutation(api.activity.recordActivity, {
      event: body.event,
      ...(durationMs ? { durationMs } : {}),
      deviceDetails: getDeviceDetails(request.headers.get("user-agent")),
      location: getLocation(request),
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Could not write to the Convex activity log." }, { status: 503 })
  }
}
