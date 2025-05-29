export default function HeroSection() {
  return (
    <section className="relative pt-[70px] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/background.png')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="hero-gradient w-full md:w-3/5 p-8 md:p-12 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
            Empowering Tigray's Future
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-600 mb-6">
            One Platform, One Talent, One Vision
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-xl">
            MEMI is a purpose-driven company based in Tigray, Ethiopia, focused
            on post-war recovery and youth empowerment through innovative
            solutions in technology, real estate, talent development, and
            community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#app"
              className="btn-gradient text-white px-8 py-3 rounded-button font-medium text-center whitespace-nowrap shadow-lg"
            >
              Learn About Our App
            </a>
            <a
              href="#involved"
              className="border-2 border-purple-500 text-purple-600 px-8 py-3 rounded-button font-medium text-center whitespace-nowrap hover:bg-purple-500 hover:text-white transition-all shadow-lg"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
