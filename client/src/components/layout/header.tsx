import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="h-10 w-32 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">MEMI</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#app" className="nav-link text-gray-700 hover:text-primary font-medium transition-colors">
            Our App
          </a>
          <a href="#about" className="nav-link text-gray-700 hover:text-primary font-medium transition-colors">
            About
          </a>
          <a href="#services" className="nav-link text-gray-700 hover:text-primary font-medium transition-colors">
            Services
          </a>
          <a href="#divisions" className="nav-link text-gray-700 hover:text-primary font-medium transition-colors">
            Divisions
          </a>
          <a href="#involved" className="nav-link text-gray-700 hover:text-primary font-medium transition-colors">
            Get Involved
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/admin/login" className="hidden md:inline-flex text-sm text-gray-600 hover:text-primary transition-colors">
            <i className="ri-admin-line mr-1"></i>Admin
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
      <div className={`mobile-menu fixed top-[70px] left-0 w-full h-screen bg-white shadow-lg md:hidden z-50 ${isMobileMenuOpen ? "" : "hidden"}`}>
        <div className="p-6 flex flex-col space-y-4">
          <a
            href="#app"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 border-b border-gray-100"
          >
            Our App
          </a>
          <a
            href="#about"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 border-b border-gray-100"
          >
            About
          </a>
          <a
            href="#services"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 border-b border-gray-100"
          >
            Services
          </a>
          <a
            href="#divisions"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 border-b border-gray-100"
          >
            Divisions
          </a>
          <a
            href="#involved"
            onClick={closeMobileMenu}
            className="text-gray-700 hover:text-primary font-medium py-2 px-4 border-b border-gray-100"
          >
            Get Involved
          </a>
          <Link
            href="/admin/login"
            onClick={closeMobileMenu}
            className="text-gray-600 hover:text-primary font-medium py-2 px-4 border-t border-gray-100 mt-2 pt-4"
          >
            <i className="ri-admin-line mr-1"></i>Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}
