import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import AboutForm from "@/components/admin/about-form";
import { FileText, BarChart3, Users, Target } from "lucide-react";

export default function AdminAbout() {
  const queryClient = useQueryClient();

  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ["/api/about"],
    queryFn: () => api.getAboutContent(),
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: () => api.getStats(),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/about"] });
    queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
  };

  if (isLoading) {
    return <div className="p-6">Loading about content...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-emerald-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          About Content Management
        </h1>
        <p className="text-gray-600 mt-2">Manage company information, statistics, and about section content</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-100">Total Stats</p>
                <p className="text-2xl font-bold">{stats?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Content Status</p>
                <p className="text-2xl font-bold">{aboutContent ? 'Active' : 'Draft'}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Team Size</p>
                <p className="text-2xl font-bold">50+</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-100">Goals</p>
                <p className="text-2xl font-bold">5+</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Content</CardTitle>
          </CardHeader>
          <CardContent>
            <AboutForm 
              aboutContent={aboutContent}
              stats={stats || []}
              onSuccess={handleSuccess}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary">
                {aboutContent?.title || "About MEMI"}
              </h2>
              <h3 className="text-xl font-semibold text-secondary">
                {aboutContent?.heading || "A Purpose-Driven Company"}
              </h3>
              <div className="prose text-gray-700">
                <p>{aboutContent?.content || "Content will appear here..."}</p>
              </div>
              {aboutContent?.location && (
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="ri-map-pin-line text-primary"></i>
                  </div>
                  <span className="text-gray-700">{aboutContent.location}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
