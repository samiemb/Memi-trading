import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky-header fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-[70px]">
        <Link href="/" className="flex items-center">
          <img src="/assets/logo.jpg" alt="MEMI Logo" className="h-12 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          <a href="#app" className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 group">
            <span className="relative z-10">Our App</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
          <a href="#about" className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 group">
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
          <a href="#services" className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 group">
            <span className="relative z-10">Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
          <a href="#divisions" className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 group">
            <span className="relative z-10">Divisions</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
          <a href="#involved" className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105 group">
            <span className="relative z-10">Get Involved</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 transition-transform duration-300" />
            )}
          </button>
          <Link href="/admin/login" className="hidden md:inline-flex btn-gradient text-white px-4 py-2 rounded-button text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            <i className="ri-admin-line mr-2"></i>Admin Dashboard
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            <i className="ri-menu-line ri-lg text-gray-700"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-[70px] left-0 w-full h-screen bg-white dark:bg-gray-900 shadow-lg md:hidden z-50 transition-all duration-300 ${isMobileMenuOpen ? "" : "hidden"}`}>
        <div className="p-6 flex flex-col space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h3>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          <a
            href="#app"
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium py-3 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors"
          >
            Our App
          </a>
          <a
            href="#about"
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium py-3 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium py-3 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors"
          >
            Services
          </a>
          <a
            href="#divisions"
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium py-3 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors"
          >
            Divisions
          </a>
          <a
            href="#involved"
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium py-3 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors"
          >
            Get Involved
          </a>
          <Link
            href="/admin/login"
            onClick={toggleMobileMenu}
            className="btn-gradient text-white px-6 py-3 rounded-button text-center font-medium shadow-lg mt-4"
          >
            <i className="ri-admin-line mr-2"></i>Admin Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
