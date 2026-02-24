"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";
import SectionNavigation from "./SectionNavigation";

// Client logos - you can add your logo images here
// Place logo images in /public/images/clients/ folder (or Clinets if that's the folder name)
const clientLogos = [
  { name: "Client 1", logo: "/images/Clinets/client-1.png" },
  { name: "Client 2", logo: "/images/Clinets/client-2.png" },
  { name: "Client 3", logo: "/images/Clinets/client-3.png" },
  { name: "Client 4", logo: "/images/Clinets/client-4.png" },
  { name: "Client 5", logo: "/images/Clinets/client-5.png" },
  { name: "Client 6", logo: "/images/Clinets/client-6.png" },
  { name: "Client 7", logo: "/images/Clinets/client-7.png" },
  { name: "Client 8", logo: "/images/Clinets/client-8.png" },
  { name: "Client 9", logo: "/images/Clinets/client-9.png" },
  { name: "Client 10", logo: "/images/Clinets/client-10.png" },
  { name: "Client 11", logo: "/images/Clinets/client-11.png" },
  { name: "Client 12", logo: "/images/Clinets/client-12.png" },
  { name: "Client 13", logo: "/images/Clinets/client-13.png" },
  { name: "Client 14", logo: "/images/Clinets/client-14.png" },
  { name: "Client 15", logo: "/images/Clinets/client-15.png" },
  { name: "Client 16", logo: "/images/Clinets/client-16.png" },
  { name: "Client 17", logo: "/images/Clinets/client-17.png" },
];

// Split logos into two groups: first 8 for first row, last 8 for second row
const firstRowLogos = clientLogos.slice(0, 8); // First 8 logos
const secondRowLogos = clientLogos.slice(8); // Last 8 logos

// Duplicate logos for seamless scrolling (each row has its own logos duplicated)
const firstRow = [...firstRowLogos, ...firstRowLogos, ...firstRowLogos];
const secondRow = [...secondRowLogos, ...secondRowLogos, ...secondRowLogos];

const LogoCard = ({ name, logo }: { name: string; logo: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-24 w-48 mx-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 shrink-0 rounded-lg overflow-hidden">
      {!imageError ? (
        <>
          <Image
            src={logo}
            alt={name}
            width={192}
            height={96}
            className={`object-contain max-h-full max-w-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={() => {
              setImageError(true);
            }}
            onLoad={() => {
              setImageLoaded(true);
            }}
            unoptimized
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-600 border-t-accent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : (
        // Placeholder box when image doesn't exist
        <div className="w-full h-full flex items-center justify-center border-2 border-gray-700 rounded-lg bg-gray-900/50 hover:border-accent transition-colors">
          <span className="text-gray-500 text-sm font-medium">{name}</span>
        </div>
      )}
    </div>
  );
};

export default function ClientLogos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="client-logos"
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
            Our Clients
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            Trusted by Leading Brands and Agencies
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          {/* First Row - Scrolls Left to Right */}
          <div className="w-full mb-6">
            <Marquee reverse pauseOnHover className="[--duration:120s]" repeat={6}>
              {firstRow.map((client, index) => (
                <LogoCard key={`${client.name}-${index}`} {...client} />
              ))}
            </Marquee>
          </div>

          {/* Second Row - Scrolls Right to Left */}
          <div className="w-full">
            <Marquee pauseOnHover className="[--duration:120s]" repeat={6}>
              {secondRow.map((client, index) => (
                <LogoCard key={`${client.name}-reverse-${index}`} {...client} />
              ))}
            </Marquee>
          </div>

          {/* Gradient Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/50 to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/50 to-transparent z-20"></div>
        </div>
      </div>
      <SectionNavigation currentSectionId="client-logos" />
    </section>
  );
}

