import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const recordActivity = mutation({
  args: {
    event: v.union(
      v.literal("System accessed"),
      v.literal("GitHub clicked"),
      v.literal("LinkedIn clicked"),
      v.literal("View CV clicked"),
      v.literal("CV downloaded"),
      v.literal("System open time updated"),
    ),
    durationMs: v.optional(v.number()),
    deviceDetails: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activityLog", {
      ...args,
      at: Date.now(),
    })
  },
})

export const getActivityLog = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("activityLog").withIndex("by_at").order("desc").collect()
    const totalOpenTimeMs = entries.reduce((total, entry) => total + (entry.durationMs ?? 0), 0)
    return { entries, totalOpenTimeMs }
  },
})
