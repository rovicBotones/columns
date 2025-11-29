export default function CTA() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 leading-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Let's work together to create something extraordinary. Get in touch with our team today.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://mail.google.com/mail/?view=cm&to=rovicbotones62@gmail.com" target="_blank" ><button className="px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-medium">
            Email Us
          </button></a>
          {/* <button className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium">
            Learn More
          </button> */}
        </div>
      </div>
    </section>
  )
}
