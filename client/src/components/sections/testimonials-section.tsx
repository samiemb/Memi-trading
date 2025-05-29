import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Hailemariam Tekle",
      role: "Local Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "MEMI Trading has revolutionized how we connect with talent and opportunities in Tigray. Their platform has helped us grow our business exponentially.",
      rating: 5
    },
    {
      id: 2,
      name: "Meseret Gebrehiwot", 
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c633?w=150&h=150&fit=crop&crop=face",
      content: "Thanks to MEMI's talent development programs, I was able to enhance my skills and secure a position that truly matches my potential.",
      rating: 5
    },
    {
      id: 3,
      name: "Dawit Tesfaye",
      role: "Real Estate Investor", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The real estate solutions provided by MEMI have been instrumental in our post-war recovery efforts. Professional, reliable, and results-driven.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Real stories from real people who have experienced the impact of our services in transforming Tigray's future.
          </p>
          <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl card-hover fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-button font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
}