import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const { data: faqs, isLoading } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
    retry: false,
  });

  const defaultFaqs = [
    {
      id: 1,
      question: "What services does MEMI Trading offer?",
      answer: "MEMI Trading provides comprehensive solutions including technology development, real estate services, talent development programs, and community engagement initiatives. We focus on post-war recovery and youth empowerment in Tigray.",
      category: "General"
    },
    {
      id: 2,
      question: "How can I join MEMI's talent development programs?",
      answer: "You can apply for our talent development programs through our website or by visiting our office in Mekelle. We offer various programs in technology, business skills, and professional development tailored to different skill levels.",
      category: "Programs"
    },
    {
      id: 3,
      question: "What makes MEMI different from other companies?",
      answer: "MEMI is uniquely focused on Tigray's post-war recovery and sustainable development. We combine local knowledge with innovative solutions, ensuring our services directly benefit the community while driving economic growth.",
      category: "General"
    },
    {
      id: 4,
      question: "Do you provide real estate investment opportunities?",
      answer: "Yes, we offer various real estate investment opportunities including residential, commercial, and industrial properties. Our team provides expert guidance on property development and investment strategies in the region.",
      category: "Real Estate"
    },
    {
      id: 5,
      question: "How can businesses partner with MEMI?",
      answer: "We welcome partnerships with local and international businesses. Contact our business development team to discuss collaboration opportunities, joint ventures, or how we can support your expansion into the Tigray market.",
      category: "Partnership"
    },
    {
      id: 6,
      question: "What technology solutions do you develop?",
      answer: "We develop custom software applications, mobile apps, web platforms, and digital transformation solutions. Our technology team specializes in creating solutions that address local challenges while meeting international standards.",
      category: "Technology"
    },
    {
      id: 7,
      question: "How do I contact MEMI for support?",
      answer: "You can reach us through multiple channels: email at info@memitrading.et, phone at +251 XXX XXX XXX, or visit our office in Mekelle. We also provide online support through our website.",
      category: "Support"
    },
    {
      id: 8,
      question: "Are your training programs certified?",
      answer: "Yes, our training programs are designed to meet industry standards and many offer certifications. We partner with recognized institutions to ensure our participants receive valuable, recognized credentials.",
      category: "Programs"
    }
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const categories = Array.from(new Set(displayFaqs.map(faq => faq.category)));

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-20 section-gradient-2">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center icon-bounce">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Find answers to common questions about our services, programs, and how we can help you achieve your goals.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-slate-800 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 font-medium text-sm"
              >
                {category}
              </span>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md animate-pulse">
                  <div className="h-5 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayFaqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-blue-100 card-hover fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <div className="flex items-center flex-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mr-3">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4">
                      {openFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      )}
                    </div>
                  </button>
                  
                  {openFaq === faq.id && (
                    <div className="mt-4 pl-0 md:pl-16 fade-in">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gradient text-white px-6 py-3 rounded-button font-semibold shadow-lg">
              Contact Support
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-button font-semibold hover:bg-blue-600 hover:text-white transition-all">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}