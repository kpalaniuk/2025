// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'dntaawevq',
} as const;

// Check if a string is a Cloudinary public_id (no path separators at start, no file extension)
function isPublicId(str: string): boolean {
  // Public IDs don't start with / and may contain folder paths like "Italy/IMG_8904"
  return !str.startsWith('/') && !str.startsWith('http');
}

// Build a Cloudinary URL with transformations
// Supports both:
// - Legacy paths: '/pics/Italy/IMG_8904.JPG' (extracts filename)
// - Public IDs: 'Italy/IMG_8904' or 'IMG_8904' (uses directly)
export function getCloudinaryUrl(
  imagePathOrPublicId: string,
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
    return imagePathOrPublicId;
  }
  
  // Determine the public ID
  let publicId: string;
  
  if (isPublicId(imagePathOrPublicId)) {
    // Already a public ID (e.g., "Italy/IMG_8904" or "IMG_8904")
    publicId = imagePathOrPublicId;
  } else {
    // Legacy path format - extract filename (e.g., '/pics/Italy/IMG_8904.JPG' -> 'IMG_8904')
    publicId = (imagePathOrPublicId.split('/').pop() || '')
      .replace(/\.(jpg|jpeg|png|gif|webp)$/i, ''); // Remove extension
  }
  
  // Build transformation string
  const transforms: string[] = [];
  
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  
  // Only add gravity for crop modes that support it (fill, thumb, crop)
  // 'fit', 'scale', 'limit' don't support gravity
  const cropsSupportingGravity = ['fill', 'thumb', 'crop'];
  if (options.gravity && (!options.crop || cropsSupportingGravity.includes(options.crop))) {
    transforms.push(`g_${options.gravity}`);
  }
  
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);
  
  // Default optimizations
  if (!options.quality) transforms.push('q_auto');
  if (!options.format) transforms.push('f_auto');
  
  const transformString = transforms.join(',');
  
  // Construct the full Cloudinary URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
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

