import { apiRequest } from "./queryClient";

const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

const authHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    return response.json();
  },

  async getCurrentUser() {
    const response = await fetch("/api/auth/me", {
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    
    return response.json();
  },

  // Public endpoints
  async getServices() {
    const response = await fetch("/api/services");
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    return response.json();
  },

  async getAboutContent() {
    const response = await fetch("/api/about");
    if (!response.ok) {
      throw new Error("Failed to fetch about content");
    }
    return response.json();
  },

  async getStats() {
    const response = await fetch("/api/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    return response.json();
  },

  async getAppFeatures() {
    const response = await fetch("/api/app-features");
    if (!response.ok) {
      throw new Error("Failed to fetch app features");
    }
    return response.json();
  },

  // Admin endpoints
  async createService(serviceData: any) {
    const response = await fetch("/api/admin/services", {
      method: "POST",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to create service");
    }
    
    return response.json();
  },

  async updateService(id: number, serviceData: any) {
    const response = await fetch(`/api/admin/services/${id}`, {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to update service");
    }
    
    return response.json();
  },

  async deleteService(id: number) {
    const response = await fetch(`/api/admin/services/${id}`, {
      method: "DELETE",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
    
    return response.json();
  },

  async updateAboutContent(aboutData: any) {
    const response = await fetch("/api/admin/about", {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aboutData),
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to update about content");
    }
    
    return response.json();
  },

  async updateStats(statsData: any) {
    const response = await fetch("/api/admin/stats", {
      method: "PUT",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statsData),
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to update stats");
    }
    
    return response.json();
  },

  async getMetrics() {
    const response = await fetch("/api/admin/metrics", {
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch metrics");
    }
    
    return response.json();
  },
};
