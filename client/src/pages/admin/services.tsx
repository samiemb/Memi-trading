import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import ServiceForm from "@/components/admin/service-form";
import type { Service } from "@shared/schema";

export default function AdminServices() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: () => api.getServices(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewService = () => {
    setSelectedService(null);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
    queryClient.invalidateQueries({ queryKey: ["/api/services"] });
  };

  if (isLoading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">Services Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewService} className="bg-primary hover:bg-primary/90">
              <i className="ri-add-line mr-2"></i>Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm
              service={selectedService}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Features</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {services?.map((service) => (
                  <tr key={service.id}>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                          <i className={`${service.icon} text-primary`}></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {service.description}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-gray-900">
                        {service.features.length} features
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant={service.status === "active" ? "default" : "secondary"}>
                        {service.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(service)}
                        >
                          <i className="ri-edit-line text-primary"></i>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <i className="ri-delete-bin-line text-red-500"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
