import Image from "next/image"

const projects = [
  {
    title: "PB Post Machine",
    description: "A workflow tool built to streamline content production and simplify the team’s daily publishing process.",
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Personal Projects in practice.</h2>
          </div>
          <p className="max-w-md leading-7 text-muted-foreground">A look at a product I’ve helped build. More project details can be added as the portfolio grows.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <Image src={project.image} alt={`${project.title} application preview`} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              </div>
              <div className="p-6 md:p-7">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{project.description}</p>
                </div>
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
