import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ExperienceTimeline from "@/components/experience-timeline"

export const metadata: Metadata = {
  title: "Experience | Rovic Joy Botones",
  description: "Full-stack software engineering experience at Excent One and Microsource Inc.",
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <ExperienceTimeline standalone />
      <Footer />
    </main>
  )
}
