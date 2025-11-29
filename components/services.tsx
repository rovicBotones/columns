import { Smartphone, MonitorDot, ChartArea, Palette } from "lucide-react"
export default function Services() {
  const services = [
    
    {
      title: "Web Development",
      description: "Scalable, robust technical solutions built with modern technologies and best practices.",
      icon: <MonitorDot />,
    },
    {
      title: "Mobile Development",
      description: "Innovative mobile solutions that leverage the latest technologies to drive engagement and efficiency.",
      icon: <Smartphone />,
    },
    {
      title: "Digital Strategy",
      description:
        "Comprehensive roadmaps that align technology with your business objectives and market opportunities.",
      icon: <ChartArea />,
    },
    {
      title: "Design & UX",
      description: "User-centered design that creates intuitive, beautiful experiences across all platforms.",
      icon: <Palette />,
    },
  ]

  return (
    <section id="services" className="py-15 md:py-28 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive solutions to transform your business and achieve your strategic goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
