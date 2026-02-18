"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallbackSrc?: string;
}

// Generate a tiny blur placeholder (1x1 pixel, base64 encoded)
const generateBlurPlaceholder = (color: string = "#1a1a1a") => {
  // Base64 encoded 1x1 pixel gray SVG
  const svg = `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="${color}"/></svg>`;
  // Use btoa for browser compatibility
  if (typeof window !== "undefined") {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  // Fallback for SSR
  return `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=`;
};

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  onLoad,
  onError,
  fallbackSrc,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const blurDataURL = generateBlurPlaceholder();

  useEffect(() => {
    setImageSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.(e);
    }
  };

  const imageProps = fill
    ? {
        fill: true,
        sizes: sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
      }
    : {
        width: width || 800,
        height: height || 600,
      };

  return (
    <div className={`relative ${fill ? "absolute inset-0" : ""} ${className}`}>
      {/* Blur placeholder - always visible until image loads */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-900 animate-pulse"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.1)", // Slight scale to hide blur edges
          }}
        />
      )}

      {/* Actual image */}
      <Image
        {...imageProps}
        src={imageSrc}
        alt={alt}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={85}
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={false}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
}

