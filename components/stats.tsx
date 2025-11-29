export default function Stats() {
  const stats = [
    { number: "500+", label: "Clients Served" },
    { number: "10 Years", label: "Industry Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "150+", label: "Team Members" },
  ]

  return (
    <section className="py-16 bg-card border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
