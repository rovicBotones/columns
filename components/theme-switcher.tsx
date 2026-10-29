"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const modes = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div role="group" aria-label="Color theme" className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border p-1">
      {modes.map(({ value, label, Icon }) => {
        const selected = mounted ? theme === value : value === "system"

        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} mode`}
            aria-pressed={selected}
            title={`${label} mode`}
            onClick={() => setTheme(value)}
            className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${selected ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <Icon aria-hidden="true" size={15} />
            <span className="hidden lg:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
