"use client";

import { useEffect, useRef } from "react";

export function useScrollControl() {
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const sections = [
        "hero",
        "about",
        "what-we-do",
        "event-lighting",
        "event-lighting-gallery",
        "architectural-lighting",
        "architectural-lighting-gallery",
        "kinetic-lighting",
        "kinetic-lighting-gallery",
        "immersive-installations",
        "immersive-installations-gallery",
        "contact",
      ];

      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSectionIndex = Math.round(currentScroll / windowHeight);
      
      let targetIndex = currentSectionIndex;

      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        targetIndex = currentSectionIndex + 1;
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        targetIndex = currentSectionIndex - 1;
      }

      if (targetIndex !== currentSectionIndex) {
        isScrolling.current = true;
        e.preventDefault();

        const targetId = sections[targetIndex];
        const element = document.querySelector(`#${targetId}`);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);
}
