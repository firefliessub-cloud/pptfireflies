"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SectionNavigation from "./SectionNavigation";

interface ServiceGalleryProps {
  id: string;
  title: string;
}

export default function ServiceGallery({ id, title }: ServiceGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Generate placeholder image paths - using placeholder service for dummy images
  // Each service gets unique images based on ID
  const serviceHash = id.split('-').reduce((acc, word) => acc + word.charCodeAt(0), 0);
  const images = Array.from({ length: 6 }, (_, i) => 
    `https://picsum.photos/seed/${serviceHash + i}/800/800`
  );

  return (
    <section
      id={`${id}-gallery`}
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Image Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            className="group px-8 py-4 bg-transparent border-2 border-accent text-accent font-semibold rounded-full text-lg hover:bg-accent hover:text-black transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId={`${id}-gallery`} />
    </section>
  );
}
