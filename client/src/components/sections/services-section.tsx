import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function ServicesSection() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: () => api.getServices(),
  });

  // Default services when no data is available
  const defaultServices = [
    {
      id: 1,
      title: "Technology Development",
      description: "Custom software solutions, mobile app development, and digital transformation services for businesses of all sizes.",
      features: ["Mobile & Web Applications", "E-commerce Solutions", "Digital Transformation"],
      icon: "ri-code-s-slash-line",
      category: "Technology"
    },
    {
      id: 2,
      title: "Real Estate & Construction",
      description: "Property development, construction management, and investment opportunities in Tigray's growing real estate market.",
      features: ["Residential Projects", "Commercial Development", "Construction Management"],
      icon: "ri-building-4-line",
      category: "Real Estate"
    },
    {
      id: 3,
      title: "Talent Development",
      description: "Professional training programs and skill development initiatives to empower youth and build local capacity.",
      features: ["Professional Training", "Skill Development", "Youth Empowerment"],
      icon: "ri-graduation-cap-line",
      category: "Training"
    }
  ];

  const displayServices = !isLoading && services && services.length > 0 ? services : defaultServices;

  if (isLoading) {
    return (
      <section id="services" className="py-16 md:py-24 section-gradient-2">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 md:py-24 section-gradient-2">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to drive Tigray's economic growth
            and community development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-purple-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 icon-bounce">
                <i className={`${service.icon} text-white ri-2x`}></i>
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <i className="ri-check-line text-primary mr-2"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center text-primary font-medium"
              >
                Learn More
                <i className="ri-arrow-right-line ml-1"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
