import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  level: string;
  category: string;
}

interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: string;
}

interface EventFormData {
  title: string;
  description: string;
  eventDate: string;
  location: string;
  price: string;
  capacity: string;
  organizer: string;
  category: string;
  image?: string;
}

interface TeamMemberFormData {
  name: string;
  position: string;
  email: string;
  phone?: string;
  image?: string;
  bio: string;
  department: string;
}

interface FAQFormProps {
  faq?: {
    id: number;
    question: string;
    answer: string;
    category: string;
    isActive: boolean;
  };
  onSuccess: () => void;
}

interface CourseFormProps {
  course?: any;
  onSuccess: () => void;
}

interface TestimonialFormProps {
  testimonial?: {
    id: number;
    name: string;
    position: string;
    content: string;
    imageUrl?: string;
    rating: number;
    isActive: boolean;
    displayOrder: number;
  };
  onSuccess: () => void;
}

export function CourseForm({ course, onSuccess }: CourseFormProps) {
  const [formData, setFormData] = useState<Omit<CourseFormData, 'image'>>({
    title: course?.title || "",
    description: course?.description || "",
    instructor: course?.instructor || "",
    duration: course?.duration || "",
    price: course?.price || "",
    level: course?.level || "Beginner",
    category: course?.category || "Technology",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const url = course ? `/api/admin/courses/${course.id}` : "/api/admin/courses";
      const method = course ? "PUT" : "POST";
      
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('instructor', formData.instructor);
      form.append('duration', formData.duration);
      form.append('price', formData.price);
      form.append('level', formData.level);
      form.append('category', formData.category);
      if (selectedImage) {
        form.append('imageUrl', selectedImage);
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: form,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save course");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({
        title: "Success",
        description: `Course ${course ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save course",
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
        <Label htmlFor="title">Course Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="e.g., John Smith"
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="Technology">Technology</option>
            <option value="Trading">Trading</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 8 weeks"
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., 299.00"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="level">Level</Label>
        <select
          id="level"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <Label htmlFor="image">Course Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
        />
        {selectedImage && <p className="text-sm text-gray-500 mt-1">Selected file: {selectedImage.name}</p>}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={mutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Saving..." : course ? "Update Course" : "Create Course"}
        </Button>
      </div>
    </form>
  );
}

export function NewsForm({ newsItem, onSuccess }: { newsItem?: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState<NewsFormData>({
    title: newsItem?.title || "",
    excerpt: newsItem?.excerpt || "",
    content: newsItem?.content || "",
    author: newsItem?.author || "",
    category: newsItem?.category || "General",
    image: newsItem?.image || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: NewsFormData) => {
      const url = newsItem ? `/api/admin/news/${newsItem.id}` : "/api/admin/news";
      const method = newsItem ? "PUT" : "POST";
      
      const form = new FormData();
      form.append('title', data.title);
      form.append('excerpt', data.excerpt);
      form.append('content', data.content);
      form.append('author', data.author);
      form.append('category', data.category);
      if (selectedImage) {
        form.append('imageUrl', selectedImage);
      } else if (data.image) {
        // If no new file is selected but there's an existing image URL,
        // send the URL string. The server should handle whether it's a file or a URL.
        // However, the backend currently expects 'imageUrl' from multer. 
        // Let's adjust the backend route to handle this, or assume imageUrl field is optional if no file.
        // For now, only send if a new file is selected.
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: form,
      });
      if (!response.ok) throw new Error("Failed to save news");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "Success",
        description: `News ${newsItem ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">News Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Full Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Events">Events</option>
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="image">News Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
        />
        {selectedImage && <p className="text-sm text-gray-500 mt-1">Selected file: {selectedImage.name}</p>}
        {!selectedImage && formData.image && (
          <p className="text-sm text-gray-500 mt-1">Existing image: {formData.image}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={mutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Saving..." : newsItem ? "Update News" : "Create News"}
        </Button>
      </div>
    </form>
  );
}

export function EventForm({ event, onSuccess }: { event?: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || "",
    description: event?.description || "",
    eventDate: event?.eventDate || "",
    location: event?.location || "",
    price: event?.price || "",
    capacity: event?.capacity?.toString() || "",
    organizer: event?.organizer || "",
    category: event?.category || "General",
    image: event?.image || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const url = event ? `/api/admin/events/${event.id}` : "/api/admin/events";
      const method = event ? "PUT" : "POST";
      
      const form = new FormData();
      form.append('title', data.title);
      form.append('description', data.description);

      // Append eventDate directly (ensure it's a string)
      form.append('eventDate', data.eventDate || '');

      form.append('location', data.location);
      form.append('price', data.price);
      form.append('capacity', data.capacity);
      form.append('organizer', data.organizer);
      form.append('category', data.category);
      if (selectedImage) {
        form.append('imageUrl', selectedImage);
      } else if (data.image) {
        // Similar to news, only send if a new file is selected.
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: form,
      });
      if (!response.ok) throw new Error("Failed to save event");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Success",
        description: `Event ${event ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation for required fields
    if (!formData.title || !formData.description || !formData.eventDate || !formData.location || !formData.organizer || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Title, Description, Date, Location, Organizer, Category).",
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting Event Form with data:', formData);
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventDate">Date</Label>
          <Input
            id="eventDate"
            type="datetime-local"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., Free or $50"
            required
          />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="Maximum attendees"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="image">Event Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
        />
        {selectedImage && <p className="text-sm text-gray-500 mt-1">Selected file: {selectedImage.name}</p>}
        {!selectedImage && formData.image && (
          <p className="text-sm text-gray-500 mt-1">Existing image: {formData.image}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={mutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Saving..." : event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}

export function TeamMemberForm({ member, onSuccess }: { member?: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: member?.name || "",
    position: member?.position || "",
    email: member?.email || "",
    phone: member?.phone || "",
    image: member?.image || "",
    bio: member?.bio || "",
    department: member?.department || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: TeamMemberFormData) => {
      const url = member ? `/api/admin/team/${member.id}` : "/api/admin/team";
      const method = member ? "PUT" : "POST";
      
      const form = new FormData();
      form.append('name', data.name);
      form.append('position', data.position);
      form.append('bio', data.bio);
      form.append('email', data.email);
      form.append('phone', data.phone || ""); // Ensure phone is a string
      form.append('department', data.department);

      if (selectedImage) {
        form.append('imageUrl', selectedImage);
      } else if (data.image) {
        // If no new file is selected but there's an existing image URL,
        // send the URL string.
        form.append('imageUrl', data.image);
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: form,
      });

      if (!response.ok) throw new Error("Failed to save team member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({
        title: "Success",
        description: `Team member ${member ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Bio</Label>
        <Textarea
          id="description"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="department">Department</Label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select Department</option>
          <option value="Management">Management</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
        />
        {selectedImage && <p className="text-sm text-gray-500 mt-1">Selected file: {selectedImage.name}</p>}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={mutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Saving..." : member ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  );
}

export function FAQForm({ faq, onSuccess }: FAQFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      category: faq?.category || "",
      isActive: faq?.isActive ?? true,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (faq) {
        await api.updateFAQ(faq.id, data);
        toast({
          title: "FAQ Updated",
          description: "The FAQ has been updated successfully.",
        });
      } else {
        await api.createFAQ(data);
        toast({
          title: "FAQ Created",
          description: "The FAQ has been created successfully.",
        });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            {...form.register("question", { required: "Question is required" })}
          />
          {form.formState.errors.question && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.question.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="answer">Answer</Label>
          <Textarea
            id="answer"
            {...form.register("answer", { required: "Answer is required" })}
            rows={4}
          />
          {form.formState.errors.answer && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.answer.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            {...form.register("category", { required: "Category is required" })}
          />
          {form.formState.errors.category && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            {...form.register("isActive")}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : faq ? "Update FAQ" : "Create FAQ"}
        </Button>
      </div>
    </form>
  );
}

export function TestimonialForm({ testimonial, onSuccess }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    position: testimonial?.position || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    isActive: testimonial?.isActive ?? true,
    displayOrder: testimonial?.displayOrder || 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const url = testimonial ? `/api/admin/testimonials/${testimonial.id}` : "/api/admin/testimonials";
      const method = testimonial ? "PUT" : "POST";
      
      const form = new FormData();
      form.append('name', formData.name);
      form.append('position', formData.position);
      form.append('content', formData.content);
      form.append('rating', formData.rating.toString());
      form.append('isActive', formData.isActive.toString());
      form.append('displayOrder', formData.displayOrder.toString());
      if (selectedImage) {
        form.append('imageUrl', selectedImage);
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: form,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save testimonial");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({
        title: "Success",
        description: `Testimonial ${testimonial ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save testimonial",
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Testimonial Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input
          id="displayOrder"
          type="number"
          value={formData.displayOrder}
          onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : testimonial ? "Update Testimonial" : "Add Testimonial"}
      </Button>
    </form>
  );
}