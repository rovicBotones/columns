import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Footer from "@/components/footer"
import Works from "@/components/works"

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <Services />
      <Works />
      <About />
      <Footer />
    </main>
  )
}
