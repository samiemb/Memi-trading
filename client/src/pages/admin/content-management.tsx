import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/admin-layout";
import { Plus, Edit, Trash2, BookOpen, Calendar, Newspaper, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseForm, NewsForm, EventForm, TeamMemberForm } from "@/components/admin/content-forms";
import { useLocation } from "wouter";

export default function ContentManagement() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("courses");
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const tab = params.get('tab');
    if (tab && ['courses', 'news', 'events', 'team'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
    retry: false,
  });

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["/api/news"],
    retry: false,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
    retry: false,
  });

  const { data: teamMembers, isLoading: teamLoading } = useQuery({
    queryKey: ["/api/team"],
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: number }) => {
      const response = await fetch(`/api/${type}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/${variables.type}`] });
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

  const tabs = [
    { id: "courses", label: "Courses", icon: BookOpen, count: courses?.length || 0 },
    { id: "news", label: "News", icon: Newspaper, count: news?.length || 0 },
    { id: "events", label: "Events", icon: Calendar, count: events?.length || 0 },
    { id: "team", label: "Team", icon: Users, count: teamMembers?.length || 0 },
  ];

  const handleDelete = (type: string, id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate({ type, id });
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

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Manage Courses</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <CourseForm course={editingItem} onSuccess={handleDialogClose} />
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
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('courses', course.id)}
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
        <button className="btn-gradient text-white px-4 py-2 rounded-button flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </button>
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
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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
        <button className="btn-gradient text-white px-4 py-2 rounded-button flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </button>
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
                    <span>Fee: ${event.registrationFee}</span>
                    <span>Registered: {event.registeredAttendees}/{event.capacity}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete('events', event.id)}
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
        <button className="btn-gradient text-white px-4 py-2 rounded-button flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
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
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Content Management</h1>
          <p className="text-gray-600">Manage courses, news, events, and team members</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div key={tab.id} className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{tab.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{tab.count}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
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
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "courses" && renderCourses()}
            {activeTab === "news" && renderNews()}
            {activeTab === "events" && renderEvents()}
            {activeTab === "team" && renderTeam()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}