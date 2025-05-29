import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Newspaper, 
  UserPlus,
  Settings,
  Plus,
  Edit3
} from "lucide-react";

export default function AdminDashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/admin/metrics"],
    queryFn: () => api.getMetrics(),
  });

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Manage your MEMI Trading platform with ease</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Total Services</p>
                <p className="text-2xl font-bold">{metrics?.totalServices || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Active Users</p>
                <p className="text-2xl font-bold">{metrics?.activeUsers || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-100">Total Revenue</p>
                <p className="text-2xl font-bold">${metrics?.totalRevenue || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Growth Rate</p>
                <p className="text-2xl font-bold">{metrics?.growthRate || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Courses Management */}
          <Link href="/admin/content-management?tab=courses">
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8" />
                  <Plus className="w-5 h-5 bg-white/20 rounded-full p-1" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage Courses</h3>
                <p className="text-sm text-indigo-100">Add, edit, or remove courses</p>
              </CardContent>
            </Card>
          </Link>

          {/* News Management */}
          <Link href="/admin/content-management?tab=news">
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Newspaper className="w-8 h-8" />
                  <Edit3 className="w-5 h-5 bg-white/20 rounded-full p-1" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage News</h3>
                <p className="text-sm text-emerald-100">Create and publish news articles</p>
              </CardContent>
            </Card>
          </Link>

          {/* Events Management */}
          <Link href="/admin/content-management?tab=events">
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8" />
                  <Plus className="w-5 h-5 bg-white/20 rounded-full p-1" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage Events</h3>
                <p className="text-sm text-orange-100">Schedule and organize events</p>
              </CardContent>
            </Card>
          </Link>

          {/* Team Management */}
          <Link href="/admin/content-management?tab=team">
            <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <UserPlus className="w-8 h-8" />
                  <Settings className="w-5 h-5 bg-white/20 rounded-full p-1" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage Team</h3>
                <p className="text-sm text-cyan-100">Add or update team members</p>
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/content-management?tab=courses">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </Link>
          <Link href="/admin/content-management?tab=news">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Newspaper className="w-4 h-4 mr-2" />
              Create News Article
            </Button>
          </Link>
          <Link href="/admin/content-management?tab=events">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Event
            </Button>
          </Link>
          <Link href="/admin/content-management?tab=team">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}