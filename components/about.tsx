import { Check } from "lucide-react"

const strengths = [
  "Developing and maintaining full-stack applications",
  "Building cross-platform mobile experiences with React Native",
  "Investigating complex production issues as an L3 support engineer",
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">A little about me</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Engineering with a support mindset.</h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted-foreground">
            I’m a software engineer with three years of experience spanning application development and L3 production support. I work across .NET services, React web interfaces, and React Native mobile apps, helping take features from implementation through troubleshooting and ongoing improvement.
          </p>
          <ul className="mt-8 space-y-4">
            {strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-3 text-foreground">
                <span className="mt-0.5 rounded-full bg-gray-100 p-1 text-foreground"><Check size={16} /></span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
