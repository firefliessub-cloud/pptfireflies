"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceGallery from "@/components/ServiceGallery";
import LiveEventsGallery from "@/components/LiveEventsGallery";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";
import { useScrollControl } from "@/hooks/useScrollControl";
import { useEffect, useState } from "react";

const sections = [
  "hero",
  "about",
  "what-we-do",
  "live-events",
  "live-events-gallery",
  "architectural-lighting",
  "architectural-lighting-gallery",
  "kinetic-lighting",
  "kinetic-lighting-gallery",
  "immersive-installations",
  "immersive-installations-gallery",
  "pre-viz-studio",
  "pre-viz-studio-gallery",
  "client-logos",
  "contact",
];

export default function Home() {
  useScrollControl();
  const [currentSection, setCurrentSection] = useState("hero");

  // Track current section on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map((id) => ({
        id,
        element: document.querySelector(`#${id}`),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex === -1 || currentIndex === sections.length - 1) return;
        const targetId = sections[currentIndex + 1];
        const element = document.querySelector(`#${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex === -1 || currentIndex === 0) return;
        const targetId = sections[currentIndex - 1];
        const element = document.querySelector(`#${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  return (
    <main className="relative snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-black" style={{ backgroundColor: '#000000' }}>
      <Navigation />
      <Hero />
      <About />
      <WhatWeDo />
      <ServiceHeader
        id="live-events"
        title="Live Events"
        description="Transform your events with dynamic lighting that creates unforgettable atmospheres. From intimate gatherings to grand celebrations, we craft lighting experiences that elevate every moment."
      />
      <LiveEventsGallery
        projectNames={{
          Concert: [
            "Ap Dhillon Tour",
            "Prabhu Deva Tour",
            "Messi Goat Tour",
            "Dabangg Tour",
            "DSP India Tour",
            "Sufi Tour Dhaka"
          ],
          Corporate: [
            "Corporate Project 1",
            "Corporate Project 2",
            "Corporate Project 3",
            "Corporate Project 4",
            "Corporate Project 5",
            "Corporate Project 6"
          ],
          Wedding: [
            "Ambani Wedding",
            "Udaipur Wedding",
            "Mehrangarh Wedding",
            "Wedding Project 4",
            "Wedding Project 5",
            "Wedding Project 6"
          ],
          "Sport Event": [
            "Sport Event Project 1",
            "Sport Event Project 2",
            "Sport Event Project 3",
            "Sport Event Project 4",
            "Sport Event Project 5",
            "Sport Event Project 6"
          ]
        }}
      />
      <ServiceHeader
        id="architectural-lighting"
        title="Architectural Lighting"
        description="Illuminate architectural beauty with precision lighting design. We enhance spaces, highlight structures, and create stunning visual narratives through strategic light placement and control."
      />
      <ServiceGallery
        id="architectural-lighting"
        title="Architectural Lighting"
        projectNames={[
          "Kohinoor Building",
          "Bandra Worli Sea Link",
          "Police Headquarter - Mumbai",
          "Red Fort - New Delhi ",
          "Chabutra - New Delhi",
          "Victoria Memorial"
        ]}
      />
      <ServiceHeader
        id="kinetic-lighting"
        title="Kinetic Lighting"
        description="Experience movement and light in perfect harmony. Our kinetic lighting installations bring dynamic motion to your spaces, creating mesmerizing visual experiences that captivate and inspire."
      />
      <ServiceGallery
        id="kinetic-lighting"
        title="Kinetic Lighting"
      />
      <ServiceHeader
        id="immersive-installations"
        title="Immersive Interactive Installations"
        description="Step into worlds of light where interaction meets imagination. Our immersive installations respond to movement, touch, and presence, creating unique experiences that blur the line between technology and art."
      />
      <ServiceGallery
        id="immersive-installations"
        title="Immersive Interactive Installations"
        projectNames={[
          
        ]}
      />
      <ServiceHeader
        id="pre-viz-studio"
        title="Pre Viz Studio"
        description="Visualize your lighting designs before installation. Our pre-visualization studio brings your concepts to life, allowing you to see and refine every detail before the first light is hung."
      />
      <ServiceGallery
        id="pre-viz-studio"
        title="Pre Viz Studio"
      />
      <ClientLogos />
      <Contact />
    </main>
  );
}
