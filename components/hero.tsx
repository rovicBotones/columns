export default function Hero() {
  
  return (
    <section className="py-20 md:py-32 bg-[#004aad]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart. Scalable. Game-Changing.
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
            We deliver innovative digital solutions that drive growth and create lasting impact for businesses.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#works">
              <button className="px-8 py-3 bg-white text-black rounded-lg hover:opacity-90 transition-opacity font-medium">
                Explore Our Work
              </button>
            </a>
            <a href="#services">
              <button className="px-8 py-3 bg-transparent border border-white text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                Explore Our Services
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
