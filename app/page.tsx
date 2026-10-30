import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Footer from "@/components/footer"
import Works from "@/components/works"
import ExperienceTimeline from "@/components/experience-timeline"
import ContactForm from "@/components/contact-form"
import { isPageComponentEnabled } from "@/lib/page-visibility"

export default function Home() {
  return (
    <main className="bg-background">
      {isPageComponentEnabled(process.env.SHOW_HEADER) && <Header />}
      {isPageComponentEnabled(process.env.SHOW_HERO) && <Hero />}
      {isPageComponentEnabled(process.env.SHOW_EXPERIENCE) && <ExperienceTimeline />}
      {isPageComponentEnabled(process.env.SHOW_WORKS) && <Works />}
      {isPageComponentEnabled(process.env.SHOW_EXPERTISE) && <Services />}
      {isPageComponentEnabled(process.env.SHOW_ABOUT) && <About />}
      {isPageComponentEnabled(process.env.SHOW_CONTACT) && <ContactForm />}
      {isPageComponentEnabled(process.env.SHOW_FOOTER) && <Footer />}
    </main>
  )
}
