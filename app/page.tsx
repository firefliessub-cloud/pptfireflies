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
import { useEffect, useState, useRef } from "react";
import { sections } from "@/lib/sections";

export default function Home() {
  useScrollControl();
  const [currentSection, setCurrentSection] = useState("hero");

  // Track current section on scroll - improved detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          
          // Find the section that's currently most visible
          let currentSectionId = sections[0];
          let maxVisibility = 0;

          sections.forEach((id) => {
            const element = document.querySelector(`#${id}`);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.scrollY;
              const elementBottom = elementTop + rect.height;
              
              // Calculate how much of the section is visible
              const visibleTop = Math.max(elementTop, window.scrollY);
              const visibleBottom = Math.min(elementBottom, window.scrollY + window.innerHeight);
              const visibleHeight = Math.max(0, visibleBottom - visibleTop);
              
              if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                if (visibleHeight > maxVisibility) {
                  maxVisibility = visibleHeight;
                  currentSectionId = id;
                }
              }
            }
          });

          setCurrentSection(currentSectionId);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Keyboard navigation - supports ArrowLeft/Right and ArrowUp/Down
  const isNavigating = useRef(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent navigation if already navigating or if user is typing in an input
      if (isNavigating.current) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex === -1) return;
      
      let targetIndex = currentIndex;
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
          targetIndex = currentIndex + 1;
        } else {
          return; // Already at last section
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          targetIndex = currentIndex - 1;
        } else {
          return; // Already at first section
        }
      } else {
        return; // Not a navigation key
      }

      if (targetIndex !== currentIndex) {
        isNavigating.current = true;
        const targetId = sections[targetIndex];
        const element = document.querySelector(`#${targetId}`);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update current section immediately for better responsiveness
          setCurrentSection(targetId);
          
          // Reset navigation lock after scroll completes
          setTimeout(() => {
            isNavigating.current = false;
          }, 800);
        } else {
          isNavigating.current = false;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  return (
    <main className="relative snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-black">
      <Navigation />
      <div className="relative">
        <Hero />
      </div>
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
          "Social Event": [
            "Social Event Project 1",
            "Social Event Project 2",
            "Social Event Project 3",
            "Social Event Project 4",
            "Social Event Project 5",
            "Social Event Project 6"
          ]
        }}
      />
      <ClientLogos />
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
      <Contact />
    </main>
  );
}
