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
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to drive Tigray's economic growth
            and community development.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-14 h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-6">
                <i className={`${service.icon} text-primary ri-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
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
