
import Link from "next/link"
import Image from "next/image"
export default function Partner() {
  const team = [
    {
      name: "People's Balita",
    //   role: "Chief Executive Officer",
      image: "/peoplesbalita-logo-main.png",
    },
    {
      name: "Premiere Lifestyle Club",
    //   role: "Head of Design",
      image: "/plc.png",
    },
    // {
    //   name: "Emma Rodriguez",
    //   role: "Lead Developer",
    //   image: "/professional-woman-developer.png",
    // },
    // {
    //   name: "James Thompson",
    //   role: "Strategy Director",
    //   image: "/professional-man-strategist.jpg",
    // },
  ]

  return (
    <section id="partner" className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Partner/s</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented Organizations dedicated to delivering excellence and innovation.
          </p>
        </div>
        <div className="flex justify-center mt-10 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="bg-muted rounded-lg h-48 mb-4 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              {/* <p className="text-muted-foreground text-sm">{member.role}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
