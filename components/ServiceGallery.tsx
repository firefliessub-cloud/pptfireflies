"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import SectionNavigation from "./SectionNavigation";

interface ServiceGalleryProps {
  id: string;
  title: string;
  projectNames?: string[]; // Optional array of project names
}

interface MediaItem {
  type: "image" | "video";
  src: string;
  index: number;
}

export default function ServiceGallery({ id, title, projectNames }: ServiceGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Track media type for each slot (image or video)
  // Default to undefined - will be set when media loads
  const [mediaTypes, setMediaTypes] = useState<Record<number, "image" | "video">>({});
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Helper to get file paths for a slot
  const getMediaPaths = (index: number) => {
    const itemNumber = index + 1;
    return {
      image: `/images/${id}-${itemNumber}.png`,
      imageJpg: `/images/${id}-${itemNumber}.jpg`,
      videoMp4: `/images/${id}-${itemNumber}.mp4`,
      videoWebm: `/images/${id}-${itemNumber}.webm`,
    };
  };

  // Preload images for better performance
  const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  // Check for videos and preload images when section comes into view
  useEffect(() => {
    if (!isInView) return;

    const checkForVideos = async () => {
      // Set loaded immediately so images can start showing
      setImagesLoaded(true);
      
      // Preload images in background (prioritize PNG, fallback to JPG)
      for (let i = 0; i < 6; i++) {
        const paths = getMediaPaths(i);
        // Try PNG first (faster), then JPG if PNG fails
        preloadImage(paths.image).catch(() => {
          // Only try JPG if PNG fails
          return preloadImage(paths.imageJpg);
        });
      }

      // Then check for videos
      for (let i = 0; i < 6; i++) {
        const paths = getMediaPaths(i);
        
        // Check if video exists by trying to load it
        const checkVideo = (src: string): Promise<boolean> => {
          return new Promise((resolve) => {
            const video = document.createElement("video");
            video.preload = "metadata";
            video.onloadedmetadata = () => resolve(true);
            video.onerror = () => resolve(false);
            video.src = src;
            setTimeout(() => resolve(false), 500); // Shorter timeout
          });
        };

        const hasMp4 = await checkVideo(paths.videoMp4);
        if (hasMp4) {
          setMediaTypes((prev) => ({ ...prev, [i]: "video" }));
        } else {
          const hasWebm = await checkVideo(paths.videoWebm);
          if (hasWebm) {
            setMediaTypes((prev) => ({ ...prev, [i]: "video" }));
          }
          // If no video, image will be shown by default
        }
      }
    };

    checkForVideos();
  }, [id, isInView]);

  // Auto-play videos when section comes into view
  useEffect(() => {
    if (!isInView) return;

    // Play all videos when section is visible
    videoRefs.current.forEach((video, index) => {
      if (video && mediaTypes[index] === "video") {
        video.play().catch(() => {
          // Autoplay might be blocked by browser, that's okay
        });
      }
    });

    return () => {
      // Pause videos when section is out of view (optional - for performance)
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, [isInView, mediaTypes]);

  return (
    <section
      id={`${id}-gallery`}
      ref={ref}
      className="h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden snap-start snap-always flex items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Media Gallery Grid - Supports both images and videos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {!imagesLoaded ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-900/50 animate-pulse"
              >
                <div className="absolute inset-0 bg-gray-800/50"></div>
              </div>
            ))
          ) : (
            Array.from({ length: 6 }, (_, index) => {
              const paths = getMediaPaths(index);
              const isVideo = mediaTypes[index] === "video";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                data-media-index={index}
              >
                {/* Video - shown if video type is detected */}
                {isVideo && (
                  <>
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                        // Auto-play video when it loads
                        if (el && isInView) {
                          el.play().catch(() => {
                            // Autoplay might be blocked, that's okay
                          });
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      onError={() => {
                        // If video fails, switch to image
                        setMediaTypes((prev) => {
                          const newTypes = { ...prev };
                          delete newTypes[index];
                          return newTypes;
                        });
                      }}
                    >
                      <source src={paths.videoMp4} type="video/mp4" />
                      <source src={paths.videoWebm} type="video/webm" />
                    </video>
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-300 pointer-events-none"></div>
                  </>
                )}
                
                {/* Image - shown by default or if video fails */}
                {!isVideo && (
                  <>
                    <Image
                      src={paths.image}
                      alt={`${title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      onError={(e) => {
                        // Try .jpg if .png doesn't exist
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes(".png") && !target.src.includes(".jpg")) {
                          // Try JPG version
                          const jpgSrc = target.src.replace(".png", ".jpg");
                          target.src = jpgSrc;
                        }
                        // If both image formats fail, video check will happen on video error
                      }}
                      onLoad={() => {
                        // Image loaded successfully - ensure type is set
                        if (mediaTypes[index] !== "image") {
                          setMediaTypes((prev) => ({ ...prev, [index]: "image" }));
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300"></div>
                  </>
                )}
                
                {/* Project Name Label - Bottom Center (hidden for Pre Viz Studio, Immersive Installations, and Kinetic Lighting) */}
                {id !== "pre-viz-studio" && id !== "immersive-installations" && id !== "kinetic-lighting" && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex items-end">
                    <p className="text-white font-semibold text-sm sm:text-base text-center w-full">
                      {projectNames && projectNames[index] ? projectNames[index] : `Project ${index + 1}`}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })
          )}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
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
      <SectionNavigation currentSectionId={`${id}-gallery`} />
    </section>
  );
}
