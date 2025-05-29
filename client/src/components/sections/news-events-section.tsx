import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, User, MapPin, Users, ExternalLink } from "lucide-react";

export default function NewsEventsSection() {
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["/api/news"],
    retry: false,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
    retry: false,
  });

  const defaultNews = [
    {
      id: 1,
      title: "MEMI Trading Launches New Technology Hub in Mekelle",
      excerpt: "A state-of-the-art technology center designed to foster innovation and provide modern workspace for tech startups and entrepreneurs.",
      author: "Communications Team",
      publishedAt: "2024-05-20T10:00:00Z",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Youth Empowerment Program Graduates 50 Participants",
      excerpt: "Our latest cohort of young professionals completed comprehensive training in digital skills, entrepreneurship, and leadership development.",
      author: "Eden Woldu",
      publishedAt: "2024-05-18T14:30:00Z",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Partnership Announced with International Development Organizations",
      excerpt: "Strategic partnerships formed to accelerate post-war recovery efforts and sustainable development initiatives across Tigray region.",
      author: "Samuel Berhe",
      publishedAt: "2024-05-15T09:15:00Z",
      category: "Partnership",
      imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
    }
  ];

  const defaultEvents = [
    {
      id: 1,
      title: "Digital Skills Workshop for Small Businesses",
      description: "Comprehensive workshop covering digital marketing, e-commerce, and online business management for local entrepreneurs.",
      location: "MEMI Training Center, Mekelle",
      eventDate: "2024-06-15T09:00:00Z",
      organizer: "MEMI Training Division",
      category: "Workshop",
      capacity: 30,
      registeredAttendees: 18,
      registrationFee: "150.00",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Tech Innovation Summit 2024",
      description: "Annual summit bringing together technology leaders, innovators, and entrepreneurs to discuss emerging trends and opportunities.",
      location: "Mekelle Convention Center",
      eventDate: "2024-07-20T08:30:00Z",
      organizer: "MEMI Technology Division",
      category: "Summit",
      capacity: 200,
      registeredAttendees: 95,
      registrationFee: "500.00",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Community Development Forum",
      description: "Interactive forum discussing community-led development initiatives and collaborative approaches to sustainable growth.",
      location: "MEMI Community Hall",
      eventDate: "2024-06-28T14:00:00Z",
      organizer: "Community Engagement Team",
      category: "Forum",
      capacity: 80,
      registeredAttendees: 42,
      registrationFee: "0.00",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
    }
  ];

  const displayNews = news && news.length > 0 ? news : defaultNews;
  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="py-20 section-gradient-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Latest News & Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Stay updated with our latest developments, upcoming programs, and community events.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center mr-3">
                <i className="ri-newspaper-line text-white text-sm"></i>
              </div>
              Latest News
            </h3>
            
            {newsLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {displayNews.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 card-hover fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {article.category}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="w-3 h-3 mr-1" />
                            {article.author}
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                            Read More <ExternalLink className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6">
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-button font-semibold hover:bg-blue-600 hover:text-white transition-all">
                View All News
              </button>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              Upcoming Events
            </h3>
            
            {eventsLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {displayEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 card-hover fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-lg flex flex-col items-center justify-center text-white">
                          <span className="text-xs font-medium">
                            {formatDate(event.eventDate).split(' ')[0]}
                          </span>
                          <span className="text-lg font-bold">
                            {formatDate(event.eventDate).split(' ')[1]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {event.category}
                          </span>
                          {parseFloat(event.registrationFee) === 0 ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Free
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                              ${event.registrationFee}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2 line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-1 text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(event.eventDate)}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.registeredAttendees}/{event.capacity} registered
                          </div>
                        </div>
                        <button className="w-full btn-gradient text-white py-2 rounded-button font-semibold text-sm">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6">
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-button font-semibold hover:bg-blue-600 hover:text-white transition-all">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}