// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'dntaawevq',
} as const;

// Build a Cloudinary URL with transformations
export function getCloudinaryUrl(
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
): string {
  const { cloudName } = CLOUDINARY_CONFIG;
  
  // Check if cloudinary is configured
  if (cloudName === 'YOUR_CLOUD_NAME') {
    // Fall back to local images if not configured
    return imagePath;
  }
  
  // Extract just the filename from the path (e.g., '/pics/Italy/IMG_8904.JPG' -> 'IMG_8904')
  const filename = (imagePath.split('/').pop() || '')
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, ''); // Remove extension
  
  // Build transformation string
  const transforms: string[] = [];
  
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);
  
  // Default optimizations
  if (!options.quality) transforms.push('q_auto');
  if (!options.format) transforms.push('f_auto');
  
  const transformString = transforms.join(',');
  
  // Construct the full Cloudinary URL (images at root level)
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${filename}`;
}

// Generate srcset for responsive images
export function getCloudinarySrcSet(
  imagePath: string,
  widths: number[] = [400, 800, 1200, 1600],
  options: {
    quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
): string {
  return widths
    .map(width => `${getCloudinaryUrl(imagePath, { ...options, width })} ${width}w`)
    .join(', ');
}

