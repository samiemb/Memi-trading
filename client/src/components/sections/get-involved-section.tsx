import React from 'react';

export default function GetInvolvedSection() {
  return (
    <section id="involved" className="py-20 section-gradient-1 text-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto opacity-90">
            Join us in our mission to rebuild and empower Tigray. There are
            multiple ways to be part of our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
            <div
              className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-20 rounded-full mb-6"
            >
              <i className="ri-graduation-cap-line text-primary ri-2x"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">For Trainees</h3>
            <p className="opacity-90 mb-6">
              Join our entrepreneurship and digital skills training programs to
              build your career in technology and business.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-secondary font-semibold py-3 px-6 !rounded-button hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Apply Now
            </a>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
            <div
              className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-20 rounded-full mb-6"
            >
              <i className="ri-funds-box-line text-primary ri-2x"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">For Investors</h3>
            <p className="opacity-90 mb-6">
              Invest in Tigray's future through our various initiatives and help
              create sustainable economic growth in the region.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-secondary font-semibold py-3 px-6 !rounded-button hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Learn More
            </a>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
            <div
              className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-20 rounded-full mb-6"
            >
              <i className="ri-team-line text-primary ri-2x"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">For Partners</h3>
            <p className="opacity-90 mb-6">
              Collaborate with us as a business, NGO, or institution to create
              impactful solutions for Tigray's communities.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-secondary font-semibold py-3 px-6 !rounded-button hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Partner With Us
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-lg">
            Have questions or want to discuss a custom partnership?
          </p>
          <a
            href="#"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 !rounded-button shadow-lg hover:bg-opacity-90 transition-all whitespace-nowrap"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
} 