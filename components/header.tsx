import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import ThemeSwitcher from "@/components/theme-switcher"

const links = [
  { href: "#expertise", label: "Expertise" },
  { href: "#works", label: "Work" },
  { href: "#about", label: "About" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur transition-colors duration-500">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="text-lg font-semibold tracking-tight">Rovic<span className="text-muted-foreground">.</span></Link>
        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-8">
          {links.map((link) => <Link key={link.href} href={link.href} className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:inline">{link.label}</Link>)}
          <a href="https://github.com/rovicBotones" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub profile" className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted sm:w-auto sm:gap-2 sm:px-3">
            <Github size={18} />
            <span className="hidden text-sm lg:inline">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/rovicbotones/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn profile" className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted sm:w-auto sm:gap-2 sm:px-3">
            <Linkedin size={18} />
            <span className="hidden text-sm lg:inline">LinkedIn</span>
          </a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
