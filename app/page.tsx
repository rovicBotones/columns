import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Team from "@/components/team"
import Stats from "@/components/stats"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Works from "@/components/works"
import Partner from "@/components/partner"

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      {/* <Stats /> */}
      <Services />
      <Works />
      <Partner />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}
