"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionNavigation from "./SectionNavigation";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-12 sm:mb-16 md:mb-20 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent w-full"
        >
          About Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed text-left w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <p>
            Fireflies Creative Technologies. Established in 2012, is a Mumbai-based lighting design and technology studio with an international presence across the Middle East. We work across architectural, heritage, and experiential lighting, as well as live events, weddings, corporate engagements, large-scale opening ceremonies, and concerts.
          </p>
          <p>
            At Fireflies, our mission is to enhance the visual and spatial experience of every project by combining thoughtful design, technical expertise, and innovative lighting technology across diverse scales and contexts.
          </p>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId="about" />
    </section>
  );
}
