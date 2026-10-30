const roles = [
  {
    role: "Software Engineer (Full Stack)",
    company: "Excent One",
    start: "2025-07",
    startLabel: "July 2025",
    endLabel: "Present",
    current: true,
    highlights: [
      "Develop and maintain full-stack web applications using .NET Framework, including MVC and Web API.",
      "Build modular features for the Excent One HRIS SaaS platform, serving local and international client companies.",
    ],
  },
  {
    role: "Junior Software Engineer (Full Stack)",
    company: "Microsource Inc.",
    start: "2023-07",
    startLabel: "July 2023",
    end: "2025-07",
    endLabel: "July 2025",
    current: false,
    highlights: [
      "Developed and maintained full-stack web applications using .NET Framework, including MVC and Web API.",
      "Built and supported multiple web applications serving Microsource Inc. internal clients.",
      "Collaborated with a team of 13 engineers using Azure DevOps to deliver scalable solutions aligned with business objectives and regulatory requirements.",
    ],
  },
]

export default function ExperienceTimeline({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2"
  const RoleHeading = standalone ? "h2" : "h3"

  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Career timeline</p>
      <Heading className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Experience</Heading>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Full-stack engineering roles focused on building and supporting web applications with the .NET Framework.
      </p>

      <ol aria-label="Work experience timeline" className="relative mt-12 border-s border-border">
        {roles.map((item) => (
          <li key={`${item.company}-${item.start}`} className="relative ms-7 pb-12 last:pb-0 sm:ms-10">
            <span aria-hidden="true" className={`absolute -start-[2.05rem] top-1 flex size-4 items-center justify-center rounded-full ring-4 ring-background sm:-start-[2.55rem] ${item.current ? "bg-foreground" : "border border-foreground bg-background"}`} />
            <article>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <time dateTime={item.start}>{item.startLabel}</time>
                <span aria-hidden="true"> - </span>
                {item.current ? item.endLabel : <time dateTime={item.end}>{item.endLabel}</time>}
                {item.current && <span className="ms-2 rounded-full bg-foreground px-2 py-1 text-[10px] text-background">Current</span>}
              </p>
              <RoleHeading className="mt-3 text-xl font-semibold sm:text-2xl">{item.role}</RoleHeading>
              <p className="mt-1 text-base text-muted-foreground">{item.company}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
