import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Visit Our Office
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Located in the heart of Mekelle, we're easily accessible and ready to serve you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Address</h4>
                    <p className="text-gray-600">
                      <a href="https://maps.app.goo.gl/rxXHuyaf1CrTop6w6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        MEMI Trading Building<br />
                        Mekelle, Tigray Region<br />
                        Ethiopia
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Phone</h4>
                    <p className="text-gray-600">+251919000246</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                    <p className="text-gray-600">ceo@memiplc.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Office Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 2:30 PM - 11:30 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="btn-gradient text-white px-6 py-3 rounded-button font-semibold shadow-lg w-full">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-2 rounded-2xl border border-blue-100">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d314.7509425501666!2d39.456186541129!3d13.474994321034263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1749101299686!5m2!1sen!2set" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-600 to-slate-700 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">MEMI Trading</h4>
                    <p className="text-blue-100 text-sm">Mekelle, Tigray, Ethiopia</p>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 card-hover">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center mx-auto mb-4">
              <i className="ri-car-line text-white ri-lg"></i>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">By Car</h4>
            <p className="text-gray-600 text-sm">Free parking available on-site</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 card-hover">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center mx-auto mb-4">
              <i className="ri-bus-line text-white ri-lg"></i>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Public Transit</h4>
            <p className="text-gray-600 text-sm">Multiple bus routes nearby</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 card-hover">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center mx-auto mb-4">
              <i className="ri-flight-takeoff-line text-white ri-lg"></i>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Airport</h4>
            <p className="text-gray-600 text-sm">15 minutes from Mekelle Airport</p>
          </div>
        </div>
      </div>
    </section>
  );
}