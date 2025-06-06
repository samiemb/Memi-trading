import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface AppFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface SliderImage {
  src: string;
  alt: string;
}

interface AppShowcase {
  title: string;
  description: string;
  features: AppFeature[];
  sliderImages: SliderImage[];
}

export default function AppShowcaseManager() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AppShowcase>({
    title: "",
    description: "",
    features: [],
    sliderImages: []
  });

  const { data: showcase, isLoading } = useQuery<AppShowcase>({
    queryKey: ["/api/admin/app-showcase"],
    queryFn: () => api.getAppShowcase(),
    enabled: !isEditing,
  });

  const updateMutation = useMutation<AppShowcase, Error, AppShowcase>({
    mutationFn: (data: AppShowcase) => api.updateAppShowcase(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/app-showcase"] });
      queryClient.invalidateQueries({ queryKey: ["/api/app-showcase"] });
      toast.success("App showcase updated successfully");
      setIsEditing(false);
    },
    onError: (error) => {
       console.error("Update app showcase error:", error);
       toast.error(`Failed to update app showcase: ${error.message || "Unknown error"}`);
    },
  });

  const handleEdit = () => {
    if (showcase) {
      setFormData({
        ...showcase,
        sliderImages: showcase.sliderImages.slice(0, 2),
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
     if (confirm("Are you sure you want to save these changes?")) {
       updateMutation.mutate(formData);
     }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (showcase) {
      setFormData(showcase);
    }
  };

  const handleFeatureChange = (index: number, field: keyof AppFeature, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };
  
  const handleAddFeature = () => {
      setFormData({ 
          ...formData, 
          features: [...formData.features, { id: Date.now(), title: "", description: "", icon: "" }] 
      });
  };
  
  const handleRemoveFeature = (index: number) => {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: newFeatures });
  };

  const handleSliderImageChange = (index: number, field: keyof SliderImage, value: string) => {
    const newImages = [...formData.sliderImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData({ ...formData, sliderImages: newImages });
  };
  
  const handleAddSliderImage = () => {
      setFormData({ 
          ...formData, 
          sliderImages: [...formData.sliderImages, { src: "", alt: "" }] 
      });
  };
  
  const handleRemoveSliderImage = (index: number) => {
      const newImages = formData.sliderImages.filter((_, i) => i !== index);
      setFormData({ ...formData, sliderImages: newImages });
  };

  useEffect(() => {
    if (showcase && !isEditing) {
      setFormData({
        ...showcase,
        sliderImages: showcase.sliderImages.slice(0, 2),
      });
    }
  }, [showcase, isEditing]);

  if (isLoading) {
    return <div>Loading App Showcase Data...</div>;
  }

  if (!showcase && !isEditing) {
      return <div>Error loading app showcase data.</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">App Showcase Management</h2>
        {!isEditing ? (
          <Button onClick={handleEdit}>Edit Content</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={handleSave} variant="default" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button onClick={handleCancel} variant="outline" disabled={updateMutation.isPending}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={feature.id || index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
                <Input
                  placeholder="Feature Title"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  placeholder="Feature Description"
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  placeholder="Icon Class (e.g., ri-rocket-line)"
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button variant="destructive" size="icon" onClick={() => handleRemoveFeature(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
             {isEditing && (
                 <Button variant="outline" onClick={handleAddFeature}>Add Feature</Button>
             )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Slider Images</h3>
          <div className="space-y-4">
            {formData.sliderImages.map((image, index) => (
              <div key={index} className="space-y-2">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
                  <Input
                    placeholder="Image URL"
                    value={image.src}
                    onChange={(e) => handleSliderImageChange(index, "src", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    placeholder="Image Alt Text"
                    value={image.alt}
                    onChange={(e) => handleSliderImageChange(index, "alt", e.target.value)}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <Button variant="destructive" size="icon" onClick={() => handleRemoveSliderImage(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {image.src && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" onClick={handleAddSliderImage}>Add Image</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 