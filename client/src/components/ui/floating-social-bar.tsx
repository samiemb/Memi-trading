import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from "lucide-react";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/memi379",
    color: "#0088cc"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@MeMiInstituteforEntrepre-fw6br",
    color: "#FF0000"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://web.facebook.com/people/MeMi-Institute/100095158897035/",
    color: "#1877F2"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/Memitrading",
    color: "#1DA1F2"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/memitrading/",
    color: "#E4405F"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/memitrading",
    color: "#0A66C2"
  }
];

export function FloatingSocialBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero section is not intersecting (scrolled past it), show the social bar
        setIsVisible(!entry.isIntersecting);
      },
      {
        // Start showing when hero section is 20% out of view
        threshold: 0.2,
      }
    );

    // Observe the hero section
    const heroSection = document.querySelector("#hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-l-lg shadow-lg"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: social.color }}
              aria-label={`Visit our ${social.name} page`}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 