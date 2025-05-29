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
      icon: "ri-secure-payment-line"
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
      icon: "ri-team-line"
    }
  ];

  const displayFeatures = appFeatures && appFeatures.length > 0 ? appFeatures : defaultFeatures;

  return (
    <section id="app" className="py-16 md:py-24 section-gradient-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Our Digital Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive digital ecosystem connecting businesses, talent, and opportunities across Tigray.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {displayFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-md border border-blue-100 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <i className={`${feature.icon} text-white ri-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
            <div className="w-full max-w-lg mx-auto">
              <img 
                src="/assets/memi-app-preview.png" 
                alt="MEMI App Preview" 
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-slate-700/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-slate-600/20 to-blue-700/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
