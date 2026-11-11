import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  activityLog: defineTable({
    event: v.union(
      v.literal("System accessed"),
      v.literal("GitHub clicked"),
      v.literal("LinkedIn clicked"),
      v.literal("View CV clicked"),
      v.literal("CV downloaded"),
      v.literal("System open time updated"),
    ),
    at: v.number(),
    durationMs: v.optional(v.number()),
    deviceDetails: v.optional(v.string()),
    location: v.optional(v.string()),
  }).index("by_at", ["at"]),
})
