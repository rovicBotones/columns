import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ExperienceTimeline from "@/components/experience-timeline"
import { isPageComponentEnabled } from "@/lib/page-visibility"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Experience | Rovic Joy Botones",
  description: "Full-stack software engineering experience at Excent One and Microsource Inc.",
}

export default function ExperiencePage() {
  if (!isPageComponentEnabled(process.env.SHOW_EXPERIENCE)) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground">
      {isPageComponentEnabled(process.env.SHOW_HEADER) && <Header />}
      <ExperienceTimeline standalone />
      {isPageComponentEnabled(process.env.SHOW_FOOTER) && <Footer />}
    </main>
  )
}
