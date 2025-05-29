import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { Service } from "@shared/schema";

interface ServiceFormProps {
  service?: Service | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    category: service?.category || "",
    icon: service?.icon || "ri-code-s-slash-line",
    features: service?.features || [""],
    status: service?.status || "active",
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createService(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.updateService(service!.id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty features
    const cleanedFeatures = formData.features.filter(feature => feature.trim() !== "");
    
    const serviceData = {
      ...formData,
      features: cleanedFeatures,
    };

    if (service) {
      updateMutation.mutate(serviceData);
    } else {
      createMutation.mutate(serviceData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Service Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter service title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          placeholder="Enter service category"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Enter service description"
          rows={3}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="icon">Icon</Label>
        <Select value={formData.icon} onValueChange={(value) => handleInputChange("icon", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ri-code-s-slash-line">Code</SelectItem>
            <SelectItem value="ri-building-4-line">Building</SelectItem>
            <SelectItem value="ri-graduation-cap-line">Education</SelectItem>
            <SelectItem value="ri-community-line">Community</SelectItem>
            <SelectItem value="ri-service-line">Service</SelectItem>
            <SelectItem value="ri-business-line">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Feature description"
                className="flex-1"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <i className="ri-delete-bin-line text-red-500"></i>
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addFeature}
          className="text-primary"
        >
          <i className="ri-add-line mr-1"></i>Add Feature
        </Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : service ? "Update Service" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
