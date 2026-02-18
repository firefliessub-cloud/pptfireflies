"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SectionNavigation from "./SectionNavigation";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 text-center text-white"
        >
          Thank You
        </motion.h2>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
        >
          {/* Phone Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-300 text-sm">+91 9920585878</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300 text-sm">hello@fireflies.pro</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-300 text-sm">Lodha Supremus, wadala, Mumbai 400037</p>
            </div>
          </div>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId="contact" />
    </section>
  );
}
