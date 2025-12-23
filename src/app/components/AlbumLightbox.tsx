import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useCallback, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getOptimizedImageUrl } from './CloudinaryImage';

interface AlbumLightboxProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  albumTitle?: string;
}

// Image size configurations
const LIGHTBOX_IMAGE_WIDTH = 1400; // Main lightbox image
const THUMBNAIL_WIDTH = 120; // Thumbnail strip

// Thumbnail with fallback for when Cloudinary image fails
function ThumbnailButton({ 
  image, 
  index, 
  isActive, 
  onClick 
}: { 
  image: string; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const [useFallback, setUseFallback] = useState(false);
  
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
        isActive 
          ? 'ring-2 ring-amber-400 opacity-100' 
          : 'opacity-50 hover:opacity-80'
      }`}
    >
      <img
        src={useFallback 
          ? image 
          : getOptimizedImageUrl(image, { 
              width: THUMBNAIL_WIDTH, 
              crop: 'fill',
              quality: 'auto:eco'
            })
        }
        alt={`Thumbnail ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => !useFallback && setUseFallback(true)}
      />
    </button>
  );
}

export function AlbumLightbox({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0,
  albumTitle 
}: AlbumLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  const preloadedImages = useRef<Set<string>>(new Set());
  const failedImages = useRef<Set<string>>(new Set()); // Track which images failed from Cloudinary

  // Preload adjacent images for smooth navigation
  const preloadAdjacentImages = useCallback((index: number) => {
    const indicesToPreload = [
      index - 1,
      index + 1,
      index + 2, // Preload one more ahead
    ].filter(i => i >= 0 && i < images.length);

    indicesToPreload.forEach(i => {
      const src = images[i];
      if (!preloadedImages.current.has(src)) {
        preloadedImages.current.add(src);
        const img = new Image();
        img.src = getOptimizedImageUrl(src, { width: LIGHTBOX_IMAGE_WIDTH, crop: 'fit' });
      }
    });
  }, [images]);

  // Reset to initial index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setImageLoaded(false);
      setUseLocalFallback(failedImages.current.has(images[initialIndex]));
      preloadedImages.current.clear();
      // Preload adjacent images
      preloadAdjacentImages(initialIndex);
    }
  }, [isOpen, initialIndex, preloadAdjacentImages, images]);

  const goToPrevious = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1;
      setUseLocalFallback(failedImages.current.has(images[newIndex]));
      preloadAdjacentImages(newIndex);
      return newIndex;
    });
  }, [images, preloadAdjacentImages]);

  const goToNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1;
      setUseLocalFallback(failedImages.current.has(images[newIndex]));
      preloadAdjacentImages(newIndex);
      return newIndex;
    });
  }, [images, preloadAdjacentImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Content */}
          <div 
            className="relative z-10 flex flex-col items-center w-full h-full p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-5xl mb-4">
              <div className="flex items-center gap-4">
                {albumTitle && (
                  <h2 className="text-white text-xl font-light">{albumTitle}</h2>
                )}
                <span className="text-white/60 text-sm">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="size-6 text-white" />
              </button>
            </div>

            {/* Image container */}
            <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center">
              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6 md:size-8 text-white" />
              </button>

              {/* Image */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-full max-w-full flex items-center justify-center"
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={useLocalFallback 
                    ? images[currentIndex] 
                    : getOptimizedImageUrl(images[currentIndex], { 
                        width: LIGHTBOX_IMAGE_WIDTH, 
                        crop: 'fit',
                        quality: 'auto:good'
                      })
                  }
                  alt={`Photo ${currentIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    // If Cloudinary fails, fall back to local image
                    if (!useLocalFallback) {
                      failedImages.current.add(images[currentIndex]);
                      setUseLocalFallback(true);
                    }
                  }}
                  draggable={false}
                />
              </motion.div>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="size-6 md:size-8 text-white" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-4 w-full max-w-5xl overflow-x-auto">
              <div className="flex gap-2 justify-center pb-2">
                {images.map((image, index) => (
                  <ThumbnailButton
                    key={index}
                    image={image}
                    index={index}
                    isActive={index === currentIndex}
                    onClick={() => {
                      setImageLoaded(false);
                      setUseLocalFallback(failedImages.current.has(images[index]));
                      setCurrentIndex(index);
                      preloadAdjacentImages(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

