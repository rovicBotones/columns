import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Footer from "@/components/footer"
import Works from "@/components/works"
import ExperienceTimeline from "@/components/experience-timeline"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <ExperienceTimeline />
      <Works />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </main>
  )
}
