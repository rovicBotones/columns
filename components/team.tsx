export default function Team() {
  const team = [
    {
      name: "Sarah Anderson",
      role: "Chief Executive Officer",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "/professional-man-designer.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Lead Developer",
      image: "/professional-woman-developer.png",
    },
    {
      name: "James Thompson",
      role: "Strategy Director",
      image: "/professional-man-strategist.jpg",
    },
  ]

  return (
    <section id="team" className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented professionals dedicated to delivering excellence and innovation.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="bg-muted rounded-lg h-48 mb-4 overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
