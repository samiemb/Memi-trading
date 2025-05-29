import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function AboutSection() {
  const { data: aboutContent } = useQuery({
    queryKey: ["/api/about"],
    queryFn: () => api.getAboutContent(),
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: () => api.getStats(),
  });

  // Default content when no data is available
  const defaultContent = {
    title: "About MEMI",
    heading: "A Purpose-Driven Company",
    content: "MeMi Trading is a fast-growing company based in Tigray, Ethiopia, with a vision to become one of Africa's top companies by 2033. We focus on excellence, inclusiveness, and innovation to build a strong, sustainable brand. Our mission is to bring world-class products and services from Tigray to the global market, powered by talented individuals. We aim to create over 300,000 jobs for youth and women, helping to grow our community and economy.",
    location: "Headquartered in Mekelle, Tigray, Ethiopia"
  };

  const defaultStats = [
    { icon: "ri-team-line", value: "50+", label: "Young professionals trained" },
    { icon: "ri-building-line", value: "4", label: "Business divisions" },
    { icon: "ri-global-line", value: "1", label: "Digital marketplace" },
    { icon: "ri-calendar-event-line", value: "12+", label: "Community events" }
  ];

  const content = aboutContent || defaultContent;
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section id="about" className="py-16 md:py-24 section-gradient-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            {content.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-secondary mb-6">
              {content.heading}
            </h3>
            <div className="text-gray-700 mb-6 space-y-4">
              {content.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {content.location && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                  <i className="ri-map-pin-line text-primary"></i>
                </div>
                <span className="text-gray-700">{content.location}</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
            {displayStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg card-hover border border-blue-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 icon-bounce">
                  <i className={`${stat.icon} text-white ri-xl`}></i>
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</h4>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
