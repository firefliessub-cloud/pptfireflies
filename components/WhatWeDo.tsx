"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Building2, Wind, Users, MonitorPlay } from "lucide-react";
import SectionNavigation from "./SectionNavigation";

const services = [
  {
    id: "live-events",
    title: "Live Events",
    icon: Sparkles,
    description: "Transform your events with dynamic lighting",
  },
  {
    id: "architectural-lighting",
    title: "Architectural Lighting",
    icon: Building2,
    description: "Illuminate architectural beauty with precision",
  },
  {
    id: "kinetic-lighting",
    title: "Kinetic Lighting",
    icon: Wind,
    description: "Movement and light in perfect harmony",
  },
  {
    id: "immersive-installations",
    title: "Immersive Interactive Installations",
    icon: Users,
    description: "Where interaction meets imagination",
  },
  {
    id: "pre-viz-studio",
    title: "Pre Viz Studio",
    icon: MonitorPlay,
    description: "Visualize before you build",
  },
];

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleServiceClick = (id: string) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="what-we-do"
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          What We Do
        </motion.h2>

        <div className="max-w-7xl mx-auto">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
            {services.slice(0, 3).map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  onClick={() => handleServiceClick(service.id)}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 cursor-pointer overflow-hidden hover:border-accent transition-all duration-300"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 blur-xl transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6 inline-block p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-lg">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Second Row - 2 Cards Centered */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {services.slice(3).map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: (index + 3) * 0.2 }}
                  onClick={() => handleServiceClick(service.id)}
                  className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 cursor-pointer overflow-hidden hover:border-accent transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 blur-xl transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6 inline-block p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-lg">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <SectionNavigation currentSectionId="what-we-do" />
    </section>
  );
}
