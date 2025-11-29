
import Link from "next/link"
import Image from "next/image"
export default function Works() {
  const services = [
    {
      title: "PB Post Machine",
      description:
        "Streamline production and simplify the team’s daily workflow.",
      icon: "/pb-postmachine.png",
      link: "https://pb-postmachine.vercel.app/",
      tech: ["React Router 7", "PostgreSQL", "TypeScript", "ShadCN", "Supabase"]
    },
    // {
    //   title: "Design & UX",
    //   description: "User-centered design that creates intuitive, beautiful experiences across all platforms.",
    //   icon: "🎨",
    // },
    // {
    //   title: "Development",
    //   description: "Scalable, robust technical solutions built with modern technologies and best practices.",
    //   icon: "⚙️",
    // },
    // {
    //   title: "Analytics & Insights",
    //   description: "Data-driven insights that help you understand user behavior and optimize performance.",
    //   icon: "📈",
    // },
  ]

  return (
    <section id="works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Work/s</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visions that materialized
          </p>
        </div>
        <div className="flex justify-center mt-10 gap-8">
          {services.map((service, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image src={service.icon} alt="Description of my image" className="w-full"  width={100} height={100} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{service.title}</div>
                <p className="text-gray-700 text-base">{service.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {/* <Link href={service.link} target="_blank">Go to: <u>{service.link}</u></Link> */}
            </div>
            <div className="px-6 pt-4 pb-2">
                {service.tech.map((i, t) => (
                    <span key={t} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{i}</span>
                ))}
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
