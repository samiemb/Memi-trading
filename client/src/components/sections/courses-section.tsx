import { useQuery } from "@tanstack/react-query";
import { Clock, Users, Star, BookOpen, Award } from "lucide-react";

export default function CoursesSection() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
    retry: false,
  });

  const defaultCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn modern web development with HTML, CSS, JavaScript, and React. Build responsive websites and web applications from scratch.",
      instructor: "Eng. Teklay Gebrehiwot",
      duration: "12 weeks",
      level: "Beginner",
      price: "2500.00",
      category: "Technology",
      enrolledStudents: 45,
      rating: "4.8",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      description: "Master digital marketing strategies including social media marketing, SEO, content marketing, and analytics for business growth.",
      instructor: "Eden Woldu",
      duration: "8 weeks",
      level: "Intermediate",
      price: "1800.00",
      category: "Business",
      enrolledStudents: 32,
      rating: "4.7",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Real Estate Investment Basics",
      description: "Understanding property investment, market analysis, financing options, and building a profitable real estate portfolio.",
      instructor: "Dawit Haile",
      duration: "6 weeks",
      level: "Beginner",
      price: "2200.00",
      category: "Real Estate",
      enrolledStudents: 28,
      rating: "4.9",
      imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Project Management Professional",
      description: "Comprehensive project management training covering methodologies, tools, and best practices for successful project delivery.",
      instructor: "Hanan Kidane",
      duration: "10 weeks",
      level: "Intermediate",
      price: "3000.00",
      category: "Management",
      enrolledStudents: 38,
      rating: "4.6",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications using React Native and modern development tools.",
      instructor: "Samuel Berhe",
      duration: "14 weeks",
      level: "Advanced",
      price: "3500.00",
      category: "Technology",
      enrolledStudents: 22,
      rating: "4.8",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Community Leadership Development",
      description: "Develop leadership skills, community engagement strategies, and social impact measurement for effective community development.",
      instructor: "Dr. Meron Teshome",
      duration: "8 weeks",
      level: "Intermediate",
      price: "2000.00",
      category: "Leadership",
      enrolledStudents: 35,
      rating: "4.9",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
    }
  ];

  const displayCourses = courses && courses.length > 0 ? courses : defaultCourses;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center icon-bounce">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Professional Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Advance your skills with our expertly designed courses taught by industry professionals and experienced instructors.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl shadow-lg card-hover border border-blue-100 overflow-hidden fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">
                      ${course.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-blue-600" />
                      {course.instructor}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-600" />
                        {course.enrolledStudents} students
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(parseFloat(course.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({course.rating})</span>
                    </div>
                  </div>
                  
                  <button className="w-full btn-gradient text-white py-3 rounded-button font-semibold shadow-lg">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-button font-semibold hover:bg-blue-600 hover:text-white transition-all">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}