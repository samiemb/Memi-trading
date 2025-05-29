import logoPath from "@assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img
                src={logoPath}
                alt="MEMI Trading Logo"
                className="h-12 w-12 rounded-lg object-cover mr-4 border-2 border-blue-400"
              />
              <h3 className="text-2xl font-bold gradient-text">MEMI Trading</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering Tigray's future through innovation, technology, and community development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all">
                <i className="ri-facebook-fill text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all">
                <i className="ri-twitter-fill text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all">
                <i className="ri-linkedin-fill text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all">
                <i className="ri-instagram-line text-white"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#app" className="text-gray-300 hover:text-white transition-colors">Our App</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technology Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Real Estate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Talent Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Engagement</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                <span>Mekelle, Tigray, Ethiopia</span>
              </div>
              <div className="flex items-center">
                <i className="ri-phone-line mr-2"></i>
                <span>+251 XXX XXX XXX</span>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line mr-2"></i>
                <span>info@memitrading.et</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 MEMI Trading. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
