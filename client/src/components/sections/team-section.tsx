import { useQuery } from "@tanstack/react-query";
import { Calendar, Mail, Linkedin, Twitter } from "lucide-react";

export default function TeamSection() {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["/api/team"],
    retry: false,
  });

  const defaultTeamMembers = [
    {
      id: 1,
      name: "Dr. Meron Teshome",
      position: "Chief Executive Officer",
      bio: "Visionary leader with 15+ years in technology and business development, driving Tigray's digital transformation.",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b332c633?w=300&h=300&fit=crop&crop=face",
      department: "Executive",
      email: "meron@memitrading.et",
      linkedin: "https://linkedin.com/in/meronteshome",
      displayOrder: 1
    },
    {
      id: 2,
      name: "Eng. Teklay Gebrehiwot",
      position: "Chief Technology Officer",
      bio: "Software engineering expert specializing in scalable solutions and emerging technologies for enterprise growth.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      department: "Technology",
      email: "teklay@memitrading.et",
      linkedin: "https://linkedin.com/in/teklaygebrehiwot",
      twitter: "https://twitter.com/teklaytech",
      displayOrder: 2
    },
    {
      id: 3,
      name: "Hanan Kidane",
      position: "Head of Operations",
      bio: "Operations specialist focused on optimizing business processes and ensuring seamless service delivery.",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      department: "Operations",
      email: "hanan@memitrading.et",
      linkedin: "https://linkedin.com/in/hanankidane",
      displayOrder: 3
    },
    {
      id: 4,
      name: "Samuel Berhe",
      position: "Business Development Manager",
      bio: "Strategic business developer connecting opportunities across sectors to build sustainable growth partnerships.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      department: "Business Development",
      email: "samuel@memitrading.et",
      linkedin: "https://linkedin.com/in/samuelberhe",
      displayOrder: 4
    },
    {
      id: 5,
      name: "Eden Woldu",
      position: "Community Engagement Lead",
      bio: "Community advocate passionate about youth empowerment and building bridges between technology and society.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      department: "Community",
      email: "eden@memitrading.et",
      twitter: "https://twitter.com/edenwoldu",
      displayOrder: 5
    },
    {
      id: 6,
      name: "Dawit Haile",
      position: "Real Estate Director",
      bio: "Real estate expert driving post-war reconstruction efforts through innovative property development solutions.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      department: "Real Estate",
      email: "dawit@memitrading.et",
      linkedin: "https://linkedin.com/in/dawithaile",
      displayOrder: 6
    }
  ];

  const displayTeamMembers = teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

  return (
    <section className="py-20 section-gradient-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Our dedicated professionals are committed to building a brighter future for Tigray through innovation, collaboration, and excellence.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTeamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-blue-100 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-6">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200"
                  />
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {member.department}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-3">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <Mail className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.twitter && (
                    <a 
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Interested in joining our team?</p>
          <button className="btn-gradient text-white px-8 py-3 rounded-button font-semibold shadow-lg">
            <Calendar className="w-5 h-5 inline mr-2" />
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  );
}