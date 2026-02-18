"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

interface OptimizedVideoProps {
  src: string;
  srcWebm?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  priority?: boolean;
}

export default function OptimizedVideo({
  src,
  srcWebm,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  onError,
  onLoad,
  priority = false,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);

  // Load video when in view or if priority
  useEffect(() => {
    if (priority || isInView) {
      setShouldLoad(true);
    }
  }, [isInView, priority]);

  // Handle video loading and playback
  useEffect(() => {
    if (!videoRef.current || !shouldLoad) return;

    const video = videoRef.current;

    // Set preload strategy
    video.preload = priority ? "auto" : "metadata";

    // Try to play video
    const playVideo = async () => {
      try {
        if (autoPlay && isInView) {
          await video.play();
        }
      } catch (error) {
        // Autoplay might be blocked, that's okay
        console.log("Video autoplay prevented:", error);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      onLoad?.();
      playVideo();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    const handleCanPlay = () => {
      playVideo();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    // Load video source
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [shouldLoad, isInView, autoPlay, priority, onLoad, onError]);

  // Pause video when out of view (for performance)
  useEffect(() => {
    if (!videoRef.current || priority) return;

    const video = videoRef.current;

    if (isInView && autoPlay) {
      video.play().catch(() => {});
    } else if (!isInView) {
      video.pause();
    }
  }, [isInView, autoPlay, priority]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Poster image - shows immediately */}
      {poster && !isLoaded && (
        <Image
          src={poster}
          alt=""
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority={priority}
          loading="eager"
          sizes="100vw"
          quality={75}
        />
      )}

      {/* Fallback gradient if no poster */}
      {!poster && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      )}

      {/* Video element */}
      {shouldLoad && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          onError={() => {
            setHasError(true);
            onError?.();
          }}
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Loading state */}
      {!isLoaded && !hasError && shouldLoad && (
        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-accent rounded-full animate-spin opacity-50" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Failed to load video</div>
        </div>
      )}
    </div>
  );
}

