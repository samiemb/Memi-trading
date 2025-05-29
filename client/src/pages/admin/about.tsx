import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import AboutForm from "@/components/admin/about-form";

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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary">About Content Editor</h1>
        <p className="text-gray-600">Manage the about section content and statistics</p>
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
