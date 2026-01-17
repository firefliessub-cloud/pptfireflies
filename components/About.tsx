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

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          About Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
        >
          <p>
            Fireflies Creative Technologies, established in 2012, is a UAE-based, award-winning lighting design 
            and technology firm, recognised as a leader in the Middle East multimedia entertainment industry. 
            With a dedicated team of 11 talented employees, we specialise in architectural lighting design, 
            enhancing visual experiences through cutting-edge technology.
          </p>
          <p>
            Our projects span both Middle East and international markets, where we collaborate with business 
            owners, multinational corporations, and event organisers. At Fireflies, our mission is to enrich 
            the visual appeal of every project, creating captivating atmospheres through expert lighting design 
            and innovative technology.
          </p>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId="about" />
    </section>
  );
}
