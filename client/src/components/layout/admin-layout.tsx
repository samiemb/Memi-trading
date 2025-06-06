import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { 
  LayoutDashboard, 
  BookOpen, 
  Newspaper, 
  Calendar, 
  Users, 
  CheckCircle,
  Smartphone,
  Settings,
  Info,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { name: 'About Content', href: '/admin/about', icon: Info },
  { name: 'Content Management', href: '/admin/content-management', icon: BookOpen },
  { name: 'App Showcase', href: '/admin/app-showcase', icon: Smartphone },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const { logout, user } = useAdminAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-40 transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"}`}>
        <div className="p-6 border-b border-gray-200">
          {!isSidebarCollapsed && (
            <>
              <h1 className="text-xl font-bold text-[#131b87]">MEMI Admin</h1>
              <p className="text-sm text-gray-600">Content Management</p>
            </>
          )}
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {!isSidebarCollapsed && item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {!isSidebarCollapsed && "Logout"}
          </Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? "ml-16" : "ml-64"} min-h-screen`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <i className="ri-menu-line"></i>
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 admin-user-display">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-primary"></i>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.username || "Admin User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
