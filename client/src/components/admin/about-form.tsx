import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { AboutContent, Stat } from "@shared/schema";

interface AboutFormProps {
  aboutContent?: AboutContent | null;
  stats: Stat[];
  onSuccess: () => void;
}

export default function AboutForm({ aboutContent, stats, onSuccess }: AboutFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: aboutContent?.title || "About MEMI",
    heading: aboutContent?.heading || "A Purpose-Driven Company",
    content: aboutContent?.content || "",
    location: aboutContent?.location || "Headquartered in Mekelle, Tigray, Ethiopia",
  });

  const [statsData, setStatsData] = useState(
    stats.length > 0 ? stats : [
      { icon: "ri-team-line", value: "50+", label: "Young professionals trained", order: 0 },
      { icon: "ri-building-line", value: "4", label: "Business divisions", order: 1 },
      { icon: "ri-global-line", value: "1", label: "Digital marketplace", order: 2 },
      { icon: "ri-calendar-event-line", value: "12+", label: "Community events", order: 3 },
    ]
  );

  const updateAboutMutation = useMutation({
    mutationFn: (data: any) => api.updateAboutContent(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "About content updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update about content",
        variant: "destructive",
      });
    },
  });

  const updateStatsMutation = useMutation({
    mutationFn: (data: any) => api.updateStats(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Statistics updated successfully",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update about content
      await updateAboutMutation.mutateAsync(formData);
      
      // Update stats
      const statsWithOrder = statsData.map((stat, index) => ({
        ...stat,
        order: index,
      }));
      await updateStatsMutation.mutateAsync(statsWithOrder);
    } catch (error) {
      // Error handling is done in mutations
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...statsData];
    newStats[index] = { ...newStats[index], [field]: value };
    setStatsData(newStats);
  };

  const addStat = () => {
    setStatsData(prev => [...prev, {
      icon: "ri-line-chart-line",
      value: "",
      label: "",
      order: prev.length,
    }]);
  };

  const removeStat = (index: number) => {
    setStatsData(prev => prev.filter((_, i) => i !== index));
  };

  const isLoading = updateAboutMutation.isPending || updateStatsMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={formData.heading}
          onChange={(e) => handleInputChange("heading", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          rows={8}
          placeholder="Enter about content..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-4">
        <Label>Statistics</Label>
        {statsData.map((stat, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Icon (e.g., ri-team-line)"
              value={stat.icon}
              onChange={(e) => handleStatChange(index, "icon", e.target.value)}
            />
            <Input
              placeholder="Value (e.g., 50+)"
              value={stat.value}
              onChange={(e) => handleStatChange(index, "value", e.target.value)}
            />
            <div className="flex space-x-2">
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => handleStatChange(index, "label", e.target.value)}
                className="flex-1"
              />
              {statsData.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <i className="ri-delete-bin-line text-red-500"></i>
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addStat}
          className="text-primary"
        >
          <i className="ri-add-line mr-1"></i>Add Statistic
        </Button>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
