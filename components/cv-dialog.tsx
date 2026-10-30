"use client"

import type { ReactNode } from "react"
import { Download, FileText, Github, Linkedin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const skills = [
  ["Languages", "C#, JavaScript, TypeScript, PHP, SQL"],
  ["Frameworks", ".NET Framework (MVC, Web API), .NET Core, Entity Framework, LINQ, React JS, React Native, Expo, React Router 7, Laravel, CodeIgniter 3"],
  ["Databases", "Microsoft SQL Server, PostgreSQL, MySQL"],
  ["Tools and Platforms", "Git, Team Foundation Server (TFS), Azure DevOps Services"],
  ["AI and Automation", "AI-assisted software development, LLM tools (Claude), prompt engineering, Model Context Protocol (MCP)"],
  ["APIs and Integrations", "REST APIs, WordPress REST API, Meta Graph API"],
  ["Practices", "Agile/Scrum, Full Stack Web Development, SaaS Development, AI-Augmented Development Workflows"],
]

const jobs = [
  {
    title: "Software Engineer (Full Stack)",
    company: "Excent One",
    dates: "July 2025 - Present",
    highlights: [
      "Develop and maintain full stack web applications using .NET Framework (MVC and Web API).",
      "Build modular features for the Excent One HRIS SaaS platform, which serves local and international client companies.",
    ],
  },
  {
    title: "Junior Software Engineer (Full Stack)",
    company: "Microsource Inc.",
    dates: "July 2023 - July 2025",
    highlights: [
      "Developed and maintained full stack web applications using .NET Framework (MVC and Web API).",
      "Built and supported multiple web applications serving internal clients of Microsource Inc.",
      "Collaborated with a team of 13 engineers using Azure DevOps to deliver scalable solutions aligned with business objectives and regulatory requirements.",
    ],
  },
]

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="space-y-2">
      <h3 className="border-b border-foreground pb-1 text-base font-semibold">{title}</h3>
      {children}
    </section>
  )
}

export default function CvDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition hover:bg-muted">
          View CV <FileText size={17} aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="grid max-h-[92vh] max-w-3xl grid-rows-[auto_1fr_auto] gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left sm:px-8">
          <DialogTitle>Rovic Joy Botones - CV</DialogTitle>
          <DialogDescription>AI Full Stack Software Engineer</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-5 py-6 sm:px-8">
          <header className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Rovic Joy Botones</h2>
            <p className="font-semibold">AI Full Stack Software Engineer</p>
            <p className="text-sm text-muted-foreground">Tanza Cavite, Philippines</p>
            <p className="text-sm">
              Phone: <a className="underline underline-offset-2" href="tel:+639665488613">+63 966 548 8613</a>
              <span className="px-2 text-muted-foreground">|</span>
              Email: <a className="underline underline-offset-2" href="mailto:rovicbotones62@gmail.com">rovicbotones62@gmail.com</a>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a className="inline-flex items-center gap-1 underline underline-offset-2" href="https://github.com/rovicBotones" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
              <a className="inline-flex items-center gap-1 underline underline-offset-2" href="https://rovicbotones.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a>
              <a className="inline-flex items-center gap-1 underline underline-offset-2" href="https://www.linkedin.com/in/rovicbotones/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
            </div>
          </header>

          <div className="mt-6 space-y-5 text-sm leading-6">
            <CvSection title="Professional Summary">
              <p>Detail-oriented AI Full Stack Software Engineer with 3+ years of experience developing and maintaining web applications. Proficient in C#.NET, JavaScript, TypeScript, PHP, and SQL, and experienced in using AI tools and large language models (LLMs) to accelerate development, debugging, code review, and technical documentation. Hands-on experience in Agile methodologies and collaborative development environments. Skilled in problem-solving and optimizing code for performance and scalability, with a track record of delivering high-quality software that improves user experience and supports business goals.</p>
            </CvSection>

            <CvSection title="Technical Skills">
              <ul className="space-y-1">
                {skills.map(([category, list]) => <li key={category}><strong>{category}:</strong> {list}</li>)}
              </ul>
            </CvSection>

            <CvSection title="Work Experience">
              <div className="space-y-4">
                {jobs.map((job) => (
                  <article key={job.company} className="space-y-1">
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-muted-foreground">{job.company} | {job.dates}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </CvSection>

            <CvSection title="Projects">
              <article className="space-y-1">
                <h4 className="font-semibold">PB Post Machine</h4>
                <p className="text-muted-foreground">React Router 7, WordPress REST API, Meta Graph API</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Automated embedded Facebook posting to the People's Balita Facebook Page.</li>
                  <li>Automated the reporting service for tabloid production.</li>
                </ul>
              </article>
            </CvSection>

            <CvSection title="Education">
              <div className="space-y-3">
                <article>
                  <h4 className="font-semibold">Bachelor of Science in Information Technology</h4>
                  <p className="text-muted-foreground">Pamantasan ng Lungsod ng Valenzuela | 2019 - 2023</p>
                </article>
                <article>
                  <h4 className="font-semibold">Senior High School, Science, Technology, Engineering, and Mathematics (STEM) Track</h4>
                  <p className="text-muted-foreground">Our Lady of Fatima University | 2016 - 2018</p>
                </article>
              </div>
            </CvSection>
          </div>
        </div>
        <DialogFooter className="border-t border-border px-5 py-4 sm:px-8">
          <a href="/rovic-joy-botones-cv.pdf" download="Rovic-Joy-Botones-CV.pdf" className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-80">
            Download PDF <Download size={16} aria-hidden="true" />
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
