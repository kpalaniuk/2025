import { useState, useEffect, useMemo } from 'react';
import { adventures as adventureConfig, type Adventure } from '../config/adventures';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  created_at: string;
}

interface CloudinaryListResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

export interface AdventureWithImages extends Adventure {
  images: string[];
  isLoading: boolean;
}

// Fetch images from Cloudinary by tag
// To enable this, go to Cloudinary Settings > Security > Restricted media types
// Make sure "Resource list" is NOT checked (unchecked = enabled)
async function fetchImagesByTag(tag: string): Promise<string[]> {
  const { cloudName } = CLOUDINARY_CONFIG;
  
  if (cloudName === 'YOUR_CLOUD_NAME') {
    return [];
  }

  try {
    const response = await fetch(
      `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
    );

    if (!response.ok) {
      // Tag might not exist or resource list is disabled
      return [];
    }

    const data: CloudinaryListResponse = await response.json();
    
    // Sort by created_at (newest first) or by public_id for consistent ordering
    const sorted = data.resources.sort((a, b) => 
      a.public_id.localeCompare(b.public_id)
    );
    
    return sorted.map(resource => resource.public_id);
  } catch (error) {
    console.warn(`Could not fetch images for tag "${tag}":`, error);
    return [];
  }
}

// Cache for fetched albums to avoid refetching
const albumCache = new Map<string, string[]>();

export function useAdventures(): {
  adventures: AdventureWithImages[];
  isLoading: boolean;
  refreshAlbum: (id: string) => void;
} {
  const [albumImages, setAlbumImages] = useState<Record<string, string[]>>({});
  const [loadingAlbums, setLoadingAlbums] = useState<Set<string>>(new Set());
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Fetch all albums on mount
  useEffect(() => {
    async function fetchAllAlbums() {
      const tagsToFetch = adventureConfig.map(a => a.cloudinaryTag);
      const loadingSet = new Set(tagsToFetch);
      setLoadingAlbums(loadingSet);

      // Fetch all albums in parallel
      const results = await Promise.all(
        adventureConfig.map(async (adventure) => {
          // Check cache first
          if (albumCache.has(adventure.cloudinaryTag)) {
            return {
              tag: adventure.cloudinaryTag,
              images: albumCache.get(adventure.cloudinaryTag)!,
            };
          }

          const images = await fetchImagesByTag(adventure.cloudinaryTag);
          
          // Cache the result
          if (images.length > 0) {
            albumCache.set(adventure.cloudinaryTag, images);
          }
          
          return {
            tag: adventure.cloudinaryTag,
            images: images.length > 0 ? images : adventure.fallbackImages,
          };
        })
      );

      // Build the images map
      const imagesMap: Record<string, string[]> = {};
      for (const result of results) {
        imagesMap[result.tag] = result.images;
      }

      setAlbumImages(imagesMap);
      setLoadingAlbums(new Set());
      setInitialLoadComplete(true);
    }

    fetchAllAlbums();
  }, []);

  // Function to refresh a single album
  const refreshAlbum = async (id: string) => {
    const adventure = adventureConfig.find(a => a.id === id);
    if (!adventure) return;

    setLoadingAlbums(prev => new Set(prev).add(adventure.cloudinaryTag));
    
    // Clear cache for this album
    albumCache.delete(adventure.cloudinaryTag);
    
    const images = await fetchImagesByTag(adventure.cloudinaryTag);
    
    if (images.length > 0) {
      albumCache.set(adventure.cloudinaryTag, images);
    }

    setAlbumImages(prev => ({
      ...prev,
      [adventure.cloudinaryTag]: images.length > 0 ? images : adventure.fallbackImages,
    }));
    
    setLoadingAlbums(prev => {
      const next = new Set(prev);
      next.delete(adventure.cloudinaryTag);
      return next;
    });
  };

  // Combine adventure config with fetched images
  const adventuresWithImages = useMemo<AdventureWithImages[]>(() => {
    return adventureConfig.map(adventure => ({
      ...adventure,
      images: albumImages[adventure.cloudinaryTag] || adventure.fallbackImages,
      isLoading: loadingAlbums.has(adventure.cloudinaryTag),
    }));
  }, [albumImages, loadingAlbums]);

  return {
    adventures: adventuresWithImages,
    isLoading: !initialLoadComplete,
    refreshAlbum,
  };
}

