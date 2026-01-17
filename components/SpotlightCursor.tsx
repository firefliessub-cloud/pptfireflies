"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SpotlightCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(250);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor position
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Check if desktop (not touch device)
    const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;
    
    setIsDesktop(true);
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for hoverable elements
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest('[class*="cursor-pointer"]') !== null ||
        target.closest('[class*="group"]') !== null ||
        target.closest('[role="button"]') !== null;

      setIsHovering(isHoverable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isMounted]);

  useEffect(() => {
    // Update spotlight size based on hover state
    setSpotlightSize(isHovering ? 350 : 250);
  }, [isHovering]);

  useEffect(() => {
    if (!isDesktop || !isMounted) return;
    if (typeof document === "undefined") return;

    // Apply cursor: none globally via CSS class
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("custom-cursor-active");
      }
    };
  }, [isDesktop, isMounted]);

  if (!isMounted || !isVisible || !isDesktop) return null;

  return (
    <>
      {/* Dark overlay with spotlight mask */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: `radial-gradient(circle ${spotlightSize}px at ${cursorX}px ${cursorY}px, transparent 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 100%)`,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Center cursor dot indicator */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8),0_0_20px_rgba(255,215,0,0.4)]"></div>
      </motion.div>
    </>
  );
}