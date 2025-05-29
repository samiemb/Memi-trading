import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function AppShowcaseSection() {
  const { data: appFeatures } = useQuery({
    queryKey: ["/api/app-features"],
    queryFn: () => api.getAppFeatures(),
  });

  // Default features when no data is available
  const defaultFeatures = [
    {
      id: 1,
      title: "Secure Payments",
      description: "Advanced encryption and secure payment processing for all transactions on our platform.",
      icon: "ri-shield-check-line"
    },
    {
      id: 2,
      title: "Smart Logistics",
      description: "Efficient delivery and logistics management connecting local businesses with customers.",
      icon: "ri-truck-line"
    },
    {
      id: 3,
      title: "Community Network",
      description: "Connect with local businesses, professionals, and opportunities in your area.",
      icon: "ri-community-line"
    }
  ];

  const displayFeatures = appFeatures && appFeatures.length > 0 ? appFeatures : defaultFeatures;

  return (
    <section id="app" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Digital Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive digital ecosystem connecting businesses, talent, and opportunities across Tigray.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {displayFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className={`${feature.icon} text-primary`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a
                href="#contact"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
              >
                Join Our Platform
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl h-96 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600')"
              }}
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
