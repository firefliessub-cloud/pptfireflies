"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SectionNavigation from "./SectionNavigation";

interface MediaItem {
  type: "image" | "video";
  src: string;
  index: number;
}

const subcategories = ["Concert", "Corporate", "Wedding", "Social Event"];

interface LiveEventsGalleryProps {
  projectNames?: {
    [key: string]: string[]; // Subcategory name -> array of 6 project names
  };
}

export default function LiveEventsGallery({ projectNames }: LiveEventsGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Concert");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Helper to get file paths for a subcategory and slot
  const getMediaPaths = (subcategory: string, index: number) => {
    const itemNumber = index + 1;
    const subcategoryLower = subcategory.toLowerCase();
    return {
      image: `/images/live-events-${subcategoryLower}-${itemNumber}.png`,
      imageJpg: `/images/live-events-${subcategoryLower}-${itemNumber}.jpg`,
      videoMp4: `/images/live-events-${subcategoryLower}-${itemNumber}.mp4`,
      videoWebm: `/images/live-events-${subcategoryLower}-${itemNumber}.webm`,
    };
  };

  // Check for media files when subcategory changes
  useEffect(() => {
    if (!isInView) return;

    const checkForMedia = async () => {
      const newMediaItems: MediaItem[] = [];
      for (let i = 0; i < 6; i++) {
        const paths = getMediaPaths(selectedSubcategory, i);
        let foundMedia: MediaItem | null = null;

        // Check for MP4 video
        try {
          const response = await fetch(paths.videoMp4, { method: 'HEAD' });
          if (response.ok) {
            foundMedia = { type: "video", src: paths.videoMp4, index: i };
          }
        } catch (error) { /* ignore */ }

        // If no MP4, check for WebM video
        if (!foundMedia) {
          try {
            const response = await fetch(paths.videoWebm, { method: 'HEAD' });
            if (response.ok) {
              foundMedia = { type: "video", src: paths.videoWebm, index: i };
            }
          } catch (error) { /* ignore */ }
        }

        // If no video, default to image
        if (!foundMedia) {
          foundMedia = { type: "image", src: paths.image, index: i };
        }
        newMediaItems.push(foundMedia);
      }
      setMediaItems(newMediaItems);
    };

    checkForMedia();
  }, [selectedSubcategory, isInView]);

  // Auto-play videos when section comes into view
  useEffect(() => {
    if (!isInView) return;

    videoRefs.current.forEach((video, index) => {
      if (video && mediaItems[index]?.type === "video") {
        video.play().catch(() => {
          // Autoplay might be blocked by browser, that's okay
        });
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, [isInView, mediaItems]);

  return (
    <section
      id="live-events-gallery"
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Subcategory Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {subcategories.map((subcategory) => (
            <motion.button
              key={subcategory}
              onClick={() => setSelectedSubcategory(subcategory)}
              className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                selectedSubcategory === subcategory
                  ? "bg-accent text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subcategory}
            </motion.button>
          ))}
        </motion.div>

        {/* Media Gallery Grid */}
        <motion.div
          key={selectedSubcategory}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {mediaItems.map((item, index) => {
            if (!item) return null;
            const paths = getMediaPaths(selectedSubcategory, index);
            
            return (
              <motion.div
                key={`${selectedSubcategory}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                {item.type === "video" ? (
                  <>
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                        if (el && isInView) {
                          el.play().catch(() => {});
                        }
                      }}
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loop
                      muted
                      playsInline
                      autoPlay
                      preload="auto"
                      onError={() => {
                        setMediaItems((prev) => {
                          const newItems = [...prev];
                          newItems[index] = {
                            type: "image",
                            src: paths.image,
                            index: index,
                          };
                          return newItems;
                        });
                      }}
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-300 pointer-events-none"></div>
                  </>
                ) : (
                  <>
                    <Image
                      src={item.src}
                      alt={`Live Events ${selectedSubcategory} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes(".png")) {
                          target.src = paths.imageJpg;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300"></div>
                  </>
                )}
                
                {/* Project Name Label - Bottom Center (hidden for Corporate, Wedding, and Social Event) */}
                {selectedSubcategory !== "Corporate" && selectedSubcategory !== "Wedding" && selectedSubcategory !== "Social Event" && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex items-end">
                    <p className="text-white font-semibold text-sm sm:text-base text-center w-full">
                      {projectNames && projectNames[selectedSubcategory] && projectNames[selectedSubcategory][index]
                        ? projectNames[selectedSubcategory][index]
                        : `${selectedSubcategory} Project ${index + 1}`}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.a
            href="https://www.instagram.com/firefliescreativetechnologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-transparent border-2 border-accent text-accent font-semibold rounded-full text-lg hover:bg-accent hover:text-black transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
      <SectionNavigation currentSectionId="live-events-gallery" />
    </section>
  );
}

