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
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Could not write to the Convex activity log." }, { status: 503 })
  }
}
