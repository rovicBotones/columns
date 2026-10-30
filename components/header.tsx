import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import ThemeSwitcher from "@/components/theme-switcher"
import { isPageComponentEnabled } from "@/lib/page-visibility"

const links = [
  { href: "/#expertise", label: "Expertise", visible: process.env.SHOW_EXPERTISE },
  { href: "/#works", label: "Work", visible: process.env.SHOW_WORKS },
  { href: "/#about", label: "About", visible: process.env.SHOW_ABOUT },
  { href: "/#experience", label: "Experience", visible: process.env.SHOW_EXPERIENCE },
  { href: "/#contact", label: "Contact", visible: process.env.SHOW_CONTACT },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur transition-colors duration-500">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">Rovic<span className="text-muted-foreground">.</span></Link>
        <nav aria-label="Main navigation" className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-start sm:gap-4 lg:gap-6">
          {links.filter((link) => isPageComponentEnabled(link.visible)).map((link) => <Link key={link.href} href={link.href} className={`${link.label === "Experience" ? "inline" : "hidden sm:inline"} text-sm text-muted-foreground transition hover:text-foreground`}>{link.label}</Link>)}
          <a href="https://github.com/rovicBotones" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub profile" className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted lg:w-auto lg:gap-2 lg:px-3">
            <Github size={18} />
            <span className="hidden text-sm lg:inline">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/rovicbotones/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn profile" className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted lg:w-auto lg:gap-2 lg:px-3">
            <Linkedin size={18} />
            <span className="hidden text-sm lg:inline">LinkedIn</span>
          </a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
