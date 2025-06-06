import ImageSlider from "@/components/ui/image-slider";
import BackToTop from "@/components/ui/back-to-top";

interface AppFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface AppShowcase {
  title: string;
  description: string;
  features: AppFeature[];
  sliderImages: {
    src: string;
    alt: string;
  }[];
}

const defaultSliderImages = [
  {
    src: "/assets/slider/slide1.jpg",
    alt: "MEMI Trading Platform Interface"
  },
  {
    src: "/assets/slider/slide2.jpg",
    alt: "Real-time Market Analysis"
  },
  {
    src: "/assets/slider/slide3.jpg",
    alt: "Advanced Trading Tools"
  }
];

const defaultFeatures: AppFeature[] = [
  {
    id: 1,
    title: "Secure Payments",
    description: "Advanced encryption and secure payment processing for all transactions on our platform.",
    icon: "ri-secure-payment-line"
  },
  {
    id: 2,
    title: "Smart Logistics",
    description: "Efficient delivery and logistics management connecting local businesses with customers.",
    icon: "ri-truck-line"
  },
  {
    id: 3,
    title: "Community Network",
    description: "Connect with local businesses, professionals, and opportunities in your area.",
    icon: "ri-team-line"
  }
];

export default function AppShowcaseSection() {
  const displayData = {
    title: "MEMI Trading Platform",
    description: "Experience the future of trading with our advanced platform. Real-time analytics, powerful tools, and intuitive interface - all in one place.",
    features: defaultFeatures,
    sliderImages: defaultSliderImages
  };

  return (
    <section id="app" className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {displayData.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {displayData.description}
          </p>
        </div>

        {/* Image Slider */}
        <div className="w-full -mx-4 md:-mx-6 lg:-mx-8 mb-8 sm:mb-12 md:mb-16">
          <ImageSlider images={displayData.sliderImages} />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {displayData.features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BackToTop />
    </section>
  );
}
