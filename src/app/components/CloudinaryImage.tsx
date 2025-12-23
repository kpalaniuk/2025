import { useState } from 'react';
import { getCloudinaryUrl, getCloudinarySrcSet, CLOUDINARY_CONFIG } from '../config/cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  priority?: boolean;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit';
  gravity?: 'auto' | 'face' | 'center';
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  onLoad,
  priority = false,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
}: CloudinaryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const isCloudinaryConfigured = CLOUDINARY_CONFIG.cloudName !== 'YOUR_CLOUD_NAME';
  
  // If Cloudinary isn't configured, fall back to local images
  if (!isCloudinaryConfigured || hasError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding="async"
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => setHasError(true)}
      />
    );
  }
  
  // Build responsive image widths based on the requested width
  const responsiveWidths = width 
    ? [Math.round(width * 0.5), width, Math.round(width * 1.5), Math.round(width * 2)]
    : [400, 800, 1200, 1600];
  
  const optimizedSrc = getCloudinaryUrl(src, {
    width: width || 800,
    height,
    crop,
    gravity,
    quality,
  });
  
  const srcSet = getCloudinarySrcSet(src, responsiveWidths, {
    crop,
    gravity,
    quality,
  });

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding="async"
      onLoad={() => {
        setIsLoaded(true);
        onLoad?.();
      }}
      onError={() => setHasError(true)}
    />
  );
}

// Preload an image (useful for lightbox next/prev)
export function preloadCloudinaryImage(
  src: string,
  width: number = 1200
): void {
  const isCloudinaryConfigured = CLOUDINARY_CONFIG.cloudName !== 'YOUR_CLOUD_NAME';
  const url = isCloudinaryConfigured 
    ? getCloudinaryUrl(src, { width, quality: 'auto' })
    : src;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
}

// Get optimized URL directly (useful when you need just the URL)
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit';
  } = {}
): string {
  const isCloudinaryConfigured = CLOUDINARY_CONFIG.cloudName !== 'YOUR_CLOUD_NAME';
  
  if (!isCloudinaryConfigured) {
    return src;
  }
  
  return getCloudinaryUrl(src, {
    width: options.width || 800,
    height: options.height,
    crop: options.crop || 'fill',
    quality: options.quality || 'auto',
    gravity: 'auto',
  });
}

