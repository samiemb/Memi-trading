import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, BookOpen, Calendar, Newspaper, Users, CheckCircle, XCircle, Pencil, Star, GraduationCap, HelpCircle, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseForm, NewsForm, EventForm, TeamMemberForm, FAQForm, TestimonialForm } from "@/components/admin/content-forms";
import { useLocation } from "wouter";
import { api } from "@/lib/api";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: string;
  category: string;
}

interface News {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  imageUrl: string;
  department: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

interface Enrollment {
  id: number;
  courseId: number;
  courseTitle: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  motivation: string;
  status: string;
  enrollmentDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  imageUrl?: string;
  rating: number;
  isActive: boolean;
  displayOrder: number;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

export default function ContentManagement() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("courses");
  const [editingItem, setEditingItem] = useState<Course | News | Event | TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [enrollmentStatus, setEnrollmentStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const tab = params.get('tab');
    if (tab && ['courses', 'news', 'events', 'team', 'enrollments', 'faq', 'testimonials'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    retry: false,
  });

  const { data: news, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
    retry: false,
  });

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    retry: false,
  });

  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    retry: false,
  });

  const { data: faqs, isLoading: faqsLoading } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
    retry: false,
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: number }) => {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      return response.json();
    },
    onSuccess: async (_, variables) => {
      // Invalidate and refetch the data
      await queryClient.invalidateQueries({ queryKey: [`/api/${variables.type}`] });
      await queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
      // Force a refetch
      await queryClient.refetchQueries({ queryKey: [`/api/${variables.type}`] });
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ['/api/enrollments'],
    retry: false,
    staleTime: 30000, // Data will be considered fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on mount
    refetchInterval: false, // Don't refetch on interval
    refetchOnReconnect: false, // Don't refetch on reconnect
  });

  const handleSuccess = () => {
    switch (activeTab) {
      case 'courses':
        queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
        break;
      case 'news':
        queryClient.invalidateQueries({ queryKey: ["/api/news"] });
        break;
      case 'events':
        queryClient.invalidateQueries({ queryKey: ["/api/events"] });
        break;
      case 'team':
        queryClient.invalidateQueries({ queryKey: ["/api/team"] });
        break;
      case 'faq':
        queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
        break;
      case 'testimonials':
        queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
        break;
      case 'enrollments':
        queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
        break;
    }
  };

  const handleDelete = async (type: string, id: number) => {
    try {
      switch (type) {
        case 'course':
          await api.deleteCourse(id);
          break;
        case 'news':
          await api.deleteNews(id);
          break;
        case 'event':
          await api.deleteEvent(id);
          break;
        case 'team':
          await api.deleteTeamMember(id);
          break;
        case 'faq':
          await api.deleteFAQ(id);
          break;
        case 'testimonial':
          await api.deleteTestimonial(id);
          break;
        default:
          throw new Error('Invalid type');
      }
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      handleSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleUpdateEnrollmentStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update enrollment status');
      }

      const updatedEnrollment = await response.json();
      
      // Update the enrollments list immediately
      queryClient.setQueryData(['/api/enrollments'], (oldData: any) => {
        return oldData.map((enrollment: any) => 
          enrollment.id === id ? updatedEnrollment : enrollment
        );
      });

      toast({
        title: 'Success',
        description: `Enrollment ${status} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update enrollment status',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEnrollment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enrollment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete enrollment');
      }

      // Update the cache directly
      queryClient.setQueryData(['/api/enrollments'], (oldData: Enrollment[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(enrollment => enrollment.id !== id);
      });

      toast({
        title: 'Success',
        description: 'Enrollment deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete enrollment',
        variant: 'destructive',
      });
    }
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Manage Trainings</h3>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="btn-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Course" : "Add New Course"}
              </DialogTitle>
            </DialogHeader>
            <CourseForm course={editingItem} onSuccess={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      {coursesLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {courses?.map((course: any) => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 mb-2">{course.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Instructor: {course.instructor}</span>
                    <span>Duration: {course.duration}</span>
                    <span>Level: {course.level}</span>
                    <span>Price: ${course.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(course)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('course', course.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Manage News</h3>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="btn-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit News" : "Add New News"}
              </DialogTitle>
            </DialogHeader>
            <NewsForm newsItem={editingItem} onSuccess={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      {newsLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {news?.map((article: any) => (
            <div key={article.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                  <div className="text-sm text-gray-500">
                    Author: {article.author}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(article)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('news', article.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Manage Events</h3>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="btn-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <EventForm event={editingItem} onSuccess={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      {eventsLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {events?.map((event: any) => (
            <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {event.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Location: {event.location}</span>
                    <span>Organizer: {event.organizer}</span>
                    <span>Price: ${event.price}</span>
                    <span>Capacity: {event.capacity}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('event', event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Manage Team</h3>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="btn-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
            </DialogHeader>
            <TeamMemberForm member={editingItem} onSuccess={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      {teamLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {teamMembers?.map((member: any) => (
            <div key={member.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img
                    src={member.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 mb-1">{member.name}</h4>
                    <p className="text-blue-600 text-sm mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm mb-2">{member.bio}</p>
                    <div className="text-sm text-gray-500">
                      Department: {member.department}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('team', member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEnrollments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Manage Enrollments</h3>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollments?.map((enrollment) => (
              <tr key={enrollment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{enrollment.courseTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{enrollment.fullName}</div>
                  <div className="text-sm text-gray-500">{enrollment.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {enrollment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {enrollment.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleUpdateEnrollmentStatus(enrollment.id, 'approved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleUpdateEnrollmentStatus(enrollment.id, 'rejected')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteEnrollment(enrollment.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFAQs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Manage FAQs</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
            </DialogHeader>
            <FAQForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs?.map((faq) => (
              <tr key={faq.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {faq.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    faq.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {faq.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit FAQ</DialogTitle>
                      </DialogHeader>
                      <FAQForm faq={faq} onSuccess={handleSuccess} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-900 ml-2"
                    onClick={() => handleDelete('faq', faq.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestimonials = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Testimonials</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
              </DialogHeader>
              <TestimonialForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {testimonialsLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {testimonial.imageUrl && (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{testimonial.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Rating: {testimonial.rating}/5</span>
                      <span>Order: {testimonial.displayOrder}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Testimonial</DialogTitle>
                        </DialogHeader>
                        <TestimonialForm testimonial={testimonial} onSuccess={handleSuccess} />
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => handleDelete('testimonial', testimonial.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return renderCourses();
      case 'news':
        return renderNews();
      case 'events':
        return renderEvents();
      case 'team':
        return renderTeam();
      case 'enrollments':
        return renderEnrollments();
      case 'faq':
        return renderFAQs();
      case 'testimonials':
        return renderTestimonials();
      default:
        return renderCourses();
    }
  };

  const tabs: Tab[] = [
    { id: 'courses', label: 'Courses', icon: BookOpen, count: courses?.length || 0 },
    { id: 'news', label: 'News', icon: Newspaper, count: news?.length || 0 },
    { id: 'events', label: 'Events', icon: Calendar, count: events?.length || 0 },
    { id: 'team', label: 'Team', icon: Users, count: teamMembers?.length || 0 },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, count: faqs?.length || 0 },
    { id: 'testimonials', label: 'Testimonials', icon: Star, count: testimonials?.length || 0 },
    { id: 'enrollments', label: 'Enrollments', icon: GraduationCap, count: enrollments?.length || 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Content Management</h1>
        <p className="text-gray-600">Manage training programs, news, events, and team members</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {tabs.map((tab) => {
          return (
            <div key={tab.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{tab.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{tab.count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}