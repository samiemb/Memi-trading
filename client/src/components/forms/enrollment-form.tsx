import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EnrollmentFormProps {
  courseId: number;
  courseTitle: string;
  onSuccess: () => void;
}

interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  motivation: string;
}

export function EnrollmentForm({ courseId, courseTitle, onSuccess }: EnrollmentFormProps) {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          courseId,
          courseTitle,
          status: "pending",
          enrollmentDate: new Date(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit enrollment");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your enrollment request has been submitted successfully. We will contact you soon.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit enrollment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="education">Education Background</Label>
        <Input
          id="education"
          value={formData.education}
          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="experience">Relevant Experience</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="motivation">Why do you want to take this course?</Label>
        <Input
          id="motivation"
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit Enrollment"}
      </Button>
    </form>
  );
} 