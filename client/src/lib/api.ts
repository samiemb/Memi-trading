import { apiRequest } from "./queryClient";

const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

const authHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

export const api = {
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    return response.json();
  },

  async getCurrentUser() {
    const response = await apiRequest("GET", "/api/auth/me");
    return response.json();
  },

  // Public endpoints
  async getServices() {
    const response = await apiRequest("GET", "/api/services");
    return response.json();
  },

  async getAboutContent() {
    const response = await apiRequest("GET", "/api/about");
    return response.json();
  },

  async getStats() {
    const response = await apiRequest("GET", "/api/stats");
    return response.json();
  },

  async getAppFeatures() {
    const response = await apiRequest("GET", "/api/app-features");
    return response.json();
  },

  async getAppShowcase(): Promise<{
    title: string;
    description: string;
    features: Array<{
      id: number;
      title: string;
      description: string;
      icon: string;
    }>;
    sliderImages: Array<{
      src: string;
      alt: string;
    }>;
  }> {
    const response = await apiRequest("GET", "/api/app-showcase");
    return response.json();
  },

  // Admin endpoints
  async createService(serviceData: any) {
    const response = await apiRequest("POST", "/api/admin/services", serviceData);
    return response.json();
  },

  async updateService(id: number, serviceData: any) {
    const response = await apiRequest("PUT", `/api/admin/services/${id}`, serviceData);
    return response.json();
  },

  async deleteService(id: number) {
    const response = await apiRequest("DELETE", `/api/admin/services/${id}`);
    return response.json();
  },

  async updateAboutContent(aboutData: any) {
    const response = await apiRequest("PUT", "/api/admin/about", aboutData);
    return response.json();
  },

  async updateStats(statsData: any) {
    const response = await apiRequest("PUT", "/api/admin/stats", statsData);
    return response.json();
  },

  async getMetrics() {
    const response = await apiRequest("GET", "/api/admin/metrics");
    return response.json();
  },

  async updateAppShowcase(data: any) {
    const response = await apiRequest("PUT", "/api/admin/app-showcase", data);
    return response.json();
  },

  // FAQ methods
  async getFaqs() {
    const response = await apiRequest("GET", "/api/faqs");
    return response.json();
  },

  async createFAQ(data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }) {
    const response = await apiRequest("POST", "/api/admin/faqs", data);
    return response.json();
  },

  async updateFAQ(id: number, data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }) {
    const response = await apiRequest("PUT", `/api/admin/faqs/${id}`, data);
    return response.json();
  },

  async deleteFAQ(id: number) {
    const response = await apiRequest("DELETE", `/api/admin/faqs/${id}`);
    return response.json();
  },

  // Delete methods
  async deleteCourse(id: number) {
    const response = await apiRequest("DELETE", `/api/admin/courses/${id}`);
    return response.json();
  },

  async deleteNews(id: number) {
    const response = await apiRequest("DELETE", `/api/admin/news/${id}`);
    return response.json();
  },

  async deleteEvent(id: number) {
    const response = await apiRequest("DELETE", `/api/admin/events/${id}`);
    return response.json();
  },

  async deleteTeamMember(id: number) {
    return apiRequest("DELETE", `/api/admin/team/${id}`);
  },

  // Testimonial methods
  async getTestimonials() {
    const response = await apiRequest("GET", "/api/testimonials");
    return response.json();
  },

  async createTestimonial(data: FormData) {
    const response = await apiRequest("POST", "/api/admin/testimonials", data);
    return response.json();
  },

  async updateTestimonial(id: number, data: FormData) {
    const response = await apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
    return response.json();
  },

  async deleteTestimonial(id: number) {
    return apiRequest("DELETE", `/api/admin/testimonials/${id}`);
  },
};
