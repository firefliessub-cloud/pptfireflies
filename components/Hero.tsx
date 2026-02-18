"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionNavigation from "./SectionNavigation";
import { useRef, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center snap-start snap-always">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Fallback gradient - only shows if video doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          preload="auto"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay - Darkens video for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[95vw] mx-auto w-full pointer-events-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] font-bold mb-6 leading-[1.1]"
        >
          <span className="block bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent pb-2">
            Fireflies Creative
          </span>
          <span className="block bg-gradient-to-r from-accent via-accent-glow to-accent bg-clip-text text-transparent">
            Technologies
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Illuminating Experiences Through Tech
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="px-8 py-4 bg-accent text-black font-semibold rounded-full text-lg hover:bg-accent-glow transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Our Work</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={false}
              whileHover={{ opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Section Navigation */}
      <SectionNavigation currentSectionId="hero" />
    </section>
  );
}
