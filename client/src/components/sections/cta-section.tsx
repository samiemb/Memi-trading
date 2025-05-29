export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Join Tigray's Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Be part of the transformation. Connect with opportunities, develop your skills, 
            and contribute to building a stronger, more prosperous Tigray.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-button font-semibold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105">
              <i className="ri-rocket-line mr-2"></i>
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-button font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
              <i className="ri-phone-line mr-2"></i>
              Contact Us
            </button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Community Members</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/80">Success Stories</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}