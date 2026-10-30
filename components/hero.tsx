import Image from "next/image"
import profilePicture from "@/asset/display_picture.png"
import { ArrowDown, Github, Linkedin } from "lucide-react"
import CvDialog from "@/components/cv-dialog"

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background text-foreground transition-colors duration-500">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-28 lg:px-8">
        <div className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            Full-stack Software Engineer · AI Engineer · L3 Support Specialist
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            I ship useful software end to end, from <span className="text-muted-foreground">backend services to mobile apps.</span>
            </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            I’m Rovic, a full-stack engineer working across .NET, React Native, and React with Vite. I also bring hands-on L3 support experience to the systems I build and maintain.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#works" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 font-medium text-background transition hover:opacity-80">
              Explore my work <ArrowDown size={17} />
            </a>
            <a href="https://github.com/rovicBotones" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition hover:bg-muted">
              GitHub profile <Github size={17} />
            </a>
            <a href="https://www.linkedin.com/in/rovicbotones/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition hover:bg-muted">
              LinkedIn <Linkedin size={17} />
            </a>
            <CvDialog />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm md:justify-self-end">
          <div className="absolute inset-4 rotate-6 rounded-[2rem] bg-foreground/10" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-gray-800 shadow-2xl">
            <Image src={profilePicture} alt="Rovic Joy Botones" priority fill sizes="(max-width: 768px) 80vw, 400px" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Focus</p>
            <p className="mt-1 font-medium text-foreground">Build · Support · Improve</p>
          </div>
        </div>
      </div>
    </section>
  )
}
