import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import AppShowcaseSection from "@/components/sections/app-showcase-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import TeamSection from "@/components/sections/team-section";
import CoursesSection from "@/components/sections/courses-section";
import NewsEventsSection from "@/components/sections/news-events-section";
import FAQSection from "@/components/sections/faq-section";
import LocationSection from "@/components/sections/location-section";
import CTASection from "@/components/sections/cta-section";
import GetInvolvedSection from "@/components/sections/get-involved-section";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AppShowcaseSection />
        <CoursesSection />
        <NewsEventsSection />
        <TeamSection />
        <TestimonialsSection />
        <FAQSection />
        <LocationSection />
        <CTASection />
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
}
