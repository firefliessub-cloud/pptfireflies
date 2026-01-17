"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionNavigation from "./SectionNavigation";

interface ServiceHeaderProps {
  id: string;
  title: string;
  description: string;
}

export default function ServiceHeader({ id, title, description }: ServiceHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            {title}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId={id} />
    </section>
  );
}
