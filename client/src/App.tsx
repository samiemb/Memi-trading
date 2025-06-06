import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminServices from "@/pages/admin/services";
import AdminAbout from "@/pages/admin/about";
import ContentManagement from "@/pages/admin/content-management";
import AdminLayout from "@/components/layout/admin-layout";
import { AuthProvider, useAdminAuth } from "@/hooks/use-admin-auth";
import { ThemeProvider } from "@/hooks/use-theme";
import FloatingFeedback from "@/components/ui/floating-feedback";
import { FloatingSocialBar } from "@/components/ui/floating-social-bar";
import AppShowcasePage from "@/pages/admin/app-showcase";

function Router() {
  const { isAuthenticated } = useAdminAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      
      {/* Protected admin routes */}
      <Route path="/admin/services">
        {isAuthenticated ? (
          <AdminLayout>
            <AdminServices />
          </AdminLayout>
        ) : (
          <AdminLogin />
        )}
      </Route>
      
      <Route path="/admin/about">
        {isAuthenticated ? (
          <AdminLayout>
            <AdminAbout />
          </AdminLayout>
        ) : (
          <AdminLogin />
        )}
      </Route>
      
      <Route path="/admin/content-management">
        {isAuthenticated ? (
          <AdminLayout>
            <ContentManagement />
          </AdminLayout>
        ) : (
          <AdminLogin />
        )}
      </Route>
      
      <Route path="/admin/app-showcase">
        {isAuthenticated ? (
          <AdminLayout>
            <AppShowcasePage />
          </AdminLayout>
        ) : (
          <AdminLogin />
        )}
      </Route>

      <Route path="/admin">
        {isAuthenticated ? (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        ) : (
          <AdminLogin />
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="memi-ui-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <FloatingSocialBar />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
