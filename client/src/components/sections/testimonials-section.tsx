import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
    retry: false,
  });

  const displayTestimonials = Array.isArray(testimonials) && testimonials.length > 0 
    ? testimonials.filter(t => t.isActive).sort((a, b) => a.displayOrder - b.displayOrder)
    : [
        {
          id: 1,
          name: "John Smith",
          position: "CEO",
          company: "Tech Solutions",
          content: "The training program exceeded my expectations. The instructors were knowledgeable and the curriculum was comprehensive.",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        },
        {
          id: 2,
          name: "Sarah Johnson",
          position: "Marketing Director",
          company: "Global Marketing",
          content: "I've seen significant improvement in my team's performance after completing the course. Highly recommended!",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        },
        {
          id: 3,
          name: "Michael Brown",
          position: "Software Engineer",
          company: "Innovate Tech",
          content: "The hands-on approach and real-world projects made learning much more effective. Great experience!",
          rating: 5,
          imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        }
      ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            What People Say About MEMI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Discover how our comprehensive services and programs have helped individuals and organizations achieve their goals and make a positive impact.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}