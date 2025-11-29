export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">About Columns</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded since 2025, dedicated to driving innovation in mobile development, web development, and automation. 
              We partner with forward-thinking companies to deliver strategic, technology-driven solutions that accelerate growth and create measurable impact.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our multidisciplinary team blends expertise in design, engineering,
              and strategy to craft solutions that engage users while delivering real business value.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Cutting-edge mobile and web applications</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Streamlined automation for efficient workflows</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Data-driven, results-focused approach</span>
              </li>
            </ul>
          </div>
          {/* <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <img
              src="/modern-office-collaboration.png"
              alt="VisionCorp team"
              className="w-full h-full object-cover rounded-lg"
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}
