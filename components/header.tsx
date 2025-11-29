import Link from "next/link"
import Image from "next/image"
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-40 h-40 flex items-center justify-center">
              <Link href="#hero"><Image src="/rec-column-min3-removebg-preview.png" alt="Description of my image" width={500} height={300} /></Link>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#partner" className="text-foreground hover:text-primary transition-colors">
              Partners
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
