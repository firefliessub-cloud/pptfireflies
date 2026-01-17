"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import ServiceHeader from "@/components/ServiceHeader";
import ServiceGallery from "@/components/ServiceGallery";
import Contact from "@/components/Contact";
import SpotlightCursor from "@/components/SpotlightCursor";
import { useScrollControl } from "@/hooks/useScrollControl";

export default function Home() {
  useScrollControl();

  return (
    <main className="relative snap-y snap-mandatory overflow-y-scroll h-screen w-full">
      <SpotlightCursor />
      <Navigation />
      <Hero />
      <About />
      <WhatWeDo />
      <ServiceHeader
        id="event-lighting"
        title="Event Lighting"
        description="Transform your events with dynamic lighting that creates unforgettable atmospheres. From intimate gatherings to grand celebrations, we craft lighting experiences that elevate every moment."
      />
      <ServiceGallery
        id="event-lighting"
        title="Event Lighting"
      />
      <ServiceHeader
        id="architectural-lighting"
        title="Architectural Lighting"
        description="Illuminate architectural beauty with precision lighting design. We enhance spaces, highlight structures, and create stunning visual narratives through strategic light placement and control."
      />
      <ServiceGallery
        id="architectural-lighting"
        title="Architectural Lighting"
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
      />
      <Contact />
    </main>
  );
}
