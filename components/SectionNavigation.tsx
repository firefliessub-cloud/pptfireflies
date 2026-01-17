"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionNavigationProps {
  currentSectionId: string;
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

export default function SectionNavigation({ currentSectionId }: SectionNavigationProps) {
  const scrollToSection = (direction: "next" | "prev") => {
    const currentIndex = sections.indexOf(currentSectionId);
    if (currentIndex === -1) return;

    let targetIndex: number;

    if (direction === "next") {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }

    if (targetIndex === currentIndex) return;

    const targetId = sections[targetIndex];
    const element = document.querySelector(`#${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showBack = currentSectionId !== "hero";
  const showNext = currentSectionId !== "contact";

  return (
    <>
      {/* Back Button - Left Bottom */}
      {showBack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute bottom-8 left-8 z-50 cursor-pointer"
          onClick={() => scrollToSection("prev")}
        >
          <ChevronLeft className="w-8 h-8 text-accent" />
        </motion.div>
      )}

      {/* Next Button - Right Bottom */}
      {showNext && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute bottom-8 right-8 z-50 cursor-pointer"
          onClick={() => scrollToSection("next")}
        >
          <ChevronRight className="w-8 h-8 text-accent" />
        </motion.div>
      )}
    </>
  );
}