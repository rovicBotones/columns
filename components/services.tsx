import { Code2, Headset, Smartphone } from "lucide-react"

const capabilities = [
  {
    title: "Full-stack development",
    description: "Build and maintain end-to-end applications, from .NET APIs and services to responsive React interfaces powered by Vite.",
    stack: [".NET", "C#", "React", "Vite"],
    icon: Code2,
  },
  {
    title: "Mobile development",
    description: "Create cross-platform mobile experiences with React Native, connecting polished app flows to dependable backend services.",
    stack: ["React Native", "TypeScript", "API integration"],
    icon: Smartphone,
  },
  {
    title: "L3 application support",
    description: "Investigate escalated production issues, trace failures across application layers, and help restore reliable service.",
    stack: ["Troubleshooting", "Root cause analysis", "Production support"],
    icon: Headset,
  },
]

export default function Services() {
  return (
    <section id="expertise" className="border-y border-border bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">What I do</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">One engineer across the product lifecycle.</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">From shipping features to supporting them in production, I bring development and operations experience to the same team.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {capabilities.map(({ title, description, stack, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-gray-200 bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="inline-flex rounded-xl bg-gray-100 p-3 text-foreground"><Icon size={23} /></span>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 min-h-24 leading-7 text-muted-foreground">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((item) => <span key={item} className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-500">{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
