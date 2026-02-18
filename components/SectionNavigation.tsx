"use client";

import { motion } from "framer-motion";
import { sections } from "@/lib/sections";

interface SectionNavigationProps {
  currentSectionId: string;
}

export default function SectionNavigation({ currentSectionId }: SectionNavigationProps) {
  const scrollToSection = (direction: "next" | "prev") => {
    const currentIndex = sections.indexOf(currentSectionId);
    if (currentIndex === -1) {
      // Fallback: try to find the section element
      const element = document.querySelector(`#${currentSectionId}`);
      if (!element) return;
    }

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

  const currentIndex = sections.indexOf(currentSectionId);
  const showBack = currentIndex > 0;
  const showNext = currentIndex < sections.length - 1;

  return (
    <>
              {/* Back Button - Left Bottom */}
              {showBack && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                  className="fixed bottom-8 left-8 z-[100] cursor-pointer"
          onClick={() => scrollToSection("prev")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent via-accent-glow to-accent shadow-[0_4px_15px_rgba(255,215,0,0.4),0_0_30px_rgba(255,215,0,0.2)] flex items-center justify-center group hover:shadow-[0_6px_20px_rgba(255,215,0,0.6),0_0_40px_rgba(255,215,0,0.3)] transition-shadow duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-black group-hover:translate-x-[-2px] transition-transform duration-300"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      )}

              {/* Next Button - Right Bottom */}
              {showNext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                  className="fixed bottom-8 right-8 z-[100] cursor-pointer"
          onClick={() => scrollToSection("next")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent via-accent-glow to-accent shadow-[0_4px_15px_rgba(255,215,0,0.4),0_0_30px_rgba(255,215,0,0.2)] flex items-center justify-center group hover:shadow-[0_6px_20px_rgba(255,215,0,0.6),0_0_40px_rgba(255,215,0,0.3)] transition-shadow duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-black group-hover:translate-x-[2px] transition-transform duration-300"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </>
  );
}