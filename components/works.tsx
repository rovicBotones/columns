import Image from "next/image"
import { ExternalLink, Monitor, Smartphone } from "lucide-react"

type Project = {
  title: string
  description: string
  image?: string
  href?: string
  stack: string[]
  platform?: "mobile" | "web"
}

const projects: Project[] = [
  {
    title: "AHORA HRIS",
    description: "Contributed modular features to Excent One's AHORA HRIS SaaS platform, serving local and international client companies.",
    href: "https://ahora-hris.com/",
    stack: [".NET Framework", "MVC", "Web API", "HRIS SaaS"],
    platform: "web",
  },
  {
    title: "Ahora Mobile",
    description: "Contributed patches and ongoing maintenance for Ahora Mobile, Excent One's HRIS app for accessing HR information on the go.",
    href: "https://play.google.com/store/apps/details?id=com.eoi.ahoramobile&hl=en",
    stack: ["Android", "HRIS", "Patch and maintenance"],
    platform: "mobile",
  },
  {
    title: "PB Post Machine",
    description: "A workflow tool built to streamline content production and simplify the team's daily publishing process.",
    image: "/pb-postmachine.png",
    stack: ["React Router 7", "TypeScript", "PostgreSQL", "Supabase", "ShadCN"],
  },
]

export default function Works() {
  return (
    <section id="works" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Selected work</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Selected work in practice.</h2>
          </div>
          <p className="max-w-md leading-7 text-muted-foreground">Products I have built, supported, and maintained.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm">
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gray-100">
                {project.image ? (
                  <Image src={project.image} alt={`${project.title} application preview`} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
                ) : (
                  <div role="img" aria-label={project.platform === "web" ? "Web platform" : "Mobile application"} className="flex flex-col items-center gap-3 text-muted-foreground">
                    {project.platform === "web" ? <Monitor size={48} strokeWidth={1.25} aria-hidden="true" /> : <Smartphone size={48} strokeWidth={1.25} aria-hidden="true" />}
                    <span className="font-mono text-xs uppercase tracking-[0.18em]">{project.platform === "web" ? "Web platform" : "Mobile application"}</span>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{project.description}</p>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4">
                    {project.platform === "web" ? "Visit AHORA HRIS" : "View on Google Play"} <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => <span key={item} className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-500">{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
