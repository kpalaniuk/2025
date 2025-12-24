import type { LucideIcon } from 'lucide-react';
import { 
  Sun, 
  Grape, 
  Cake, 
  Music, 
  TreePine, 
  Heart, 
  Mountain, 
  Car,
  Compass,
} from 'lucide-react';

export interface Adventure {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  // Cloudinary tag name - images tagged with this will auto-populate
  // To add images: upload to Cloudinary and add this tag
  cloudinaryTag: string;
  // Feature image public_id or local path (shown on the card)
  featureImage: string;
  // Fallback images (used if Cloudinary fetch fails)
  fallbackImages: string[];
  // Grid layout class
  gridClass?: string;
}

// Adventure albums configuration
// 
// HOW TO ADD IMAGES AUTOMATICALLY:
// 1. Upload images to Cloudinary
// 2. Tag each image with the album's cloudinaryTag (e.g., "italy", "newyork")
// 3. Images will automatically appear in the album!
//
// The fallbackImages are only used if Cloudinary is unavailable.
// The featureImage is shown on the album card.

export const adventures: Adventure[] = [
  {
    id: 'italy',
    icon: Compass,
    title: 'Italy',
    subtitle: 'La Dolce Vita',
    description: 'Exploring the timeless beauty of Italy, from ancient ruins to coastal villages.',
    cloudinaryTag: 'italy',
    featureImage: 'IMG_9206',
    fallbackImages: [
      'IMG_8904', 'IMG_8908', 'IMG_8920', 'IMG_8932', 'IMG_8939', 'IMG_8980',
      'IMG_9001', 'IMG_9009', 'IMG_9024', 'IMG_9035', 'IMG_9049', 'IMG_9058',
      'IMG_9086', 'IMG_9109', 'IMG_9143', 'IMG_9175', 'IMG_9206', 'IMG_9224',
      'IMG_9237', 'IMG_9285', 'IMG_9294', 'IMG_9298', 'IMG_9309', 'IMG_9313',
      'IMG_9408', 'IMG_9412', 'IMG_9438', 'IMG_9487', 'IMG_9508', 'IMG_9555',
      'IMG_9583', 'IMG_9644',
    ],
    gridClass: 'col-span-2',
  },
  {
    id: 'newyork',
    icon: Heart,
    title: 'New York',
    subtitle: 'Wedding Season',
    description: 'Celebrating love in the city that never sleeps.',
    cloudinaryTag: 'newyork',
    featureImage: 'IMG_0862',
    fallbackImages: [
      'IMG_0462', 'IMG_0774', 'IMG_0780', 'IMG_0785', 'IMG_0792', 'IMG_0804',
      'IMG_0841', 'IMG_0862', 'IMG_0883', 'IMG_0886', 'IMG_0891', 'IMG_0897',
      'IMG_0916', 'IMG_0927', 'IMG_0960', 'IMG_0970', 'IMG_5519',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'sanjuans',
    icon: Mountain,
    title: 'San Juans',
    subtitle: 'Island Sailing',
    description: 'Sailing through the stunning San Juan Islands.',
    cloudinaryTag: 'sanjuans',
    featureImage: 'IMG_9820',
    fallbackImages: [
      'IMG_9764', 'IMG_9768', 'IMG_9779', 'IMG_9787', 'IMG_9800', 'IMG_9820',
      'IMG_9858', 'IMG_9886', 'IMG_9897', 'IMG_9898', 'IMG_9904',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'desert',
    icon: Sun,
    title: 'Desert',
    subtitle: 'Friends & Freedom',
    description: 'Sun-soaked adventures and unforgettable moments in the desert landscape.',
    cloudinaryTag: 'desert',
    featureImage: 'DSC05518',
    fallbackImages: [
      'DSC05492', 'DSC05518', 'DSC05526', 'FullSizeRender',
      'IMG_7611', 'IMG_7623', 'IMG_7645',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'solvang',
    icon: Grape,
    title: 'Solvang',
    subtitle: 'Wine Country',
    description: 'Wine country charm and Danish village magic with the whole family.',
    cloudinaryTag: 'solvang',
    featureImage: 'IMG_8134',
    fallbackImages: [
      'IMG_5167', 'IMG_5173', 'IMG_8086', 'IMG_8106',
      'IMG_8118', 'IMG_8134', 'IMG_8158', 'IMG_8170',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'birthday',
    icon: Cake,
    title: "Kyle's 40th",
    subtitle: 'The Big One',
    description: 'Celebrating the big 4-0 with friends, family, and plenty of cake.',
    cloudinaryTag: 'kylebday',
    featureImage: 'IMG_8202',
    fallbackImages: [
      'IMG_8188', 'IMG_8202', 'IMG_8226', 'IMG_8233', 'IMG_8596',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'joshuatree',
    icon: Music,
    title: 'Joshua Tree',
    subtitle: 'Music Fest',
    description: 'Desert vibes and live music under the stars at Joshua Tree.',
    cloudinaryTag: 'joshuatree',
    featureImage: 'IMG_8716',
    fallbackImages: [
      'IMG_6778', 'IMG_8690', 'IMG_8716', 'IMG_8723',
      'IMG_8731', 'IMG_8735', 'IMG_8756', 'IMG_8765',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'oregon',
    icon: TreePine,
    title: 'Oregon',
    subtitle: 'Pacific Northwest',
    description: 'Pacific Northwest beauty with forests, coastlines, and mountain views.',
    cloudinaryTag: 'oregon',
    featureImage: 'IMG_0304',
    fallbackImages: ['IMG_0231', 'IMG_0304', 'IMG_0330', 'IMG_0354'],
    gridClass: '',
  },
  {
    id: 'sierras',
    icon: Mountain,
    title: 'Sierras',
    subtitle: 'Backpacking',
    description: 'High alpine adventure and wilderness exploration in the Sierra Nevada.',
    cloudinaryTag: 'sierras',
    featureImage: 'IMG_1024',
    fallbackImages: [
      'IMG_1009', 'IMG_1012', 'IMG_1024', 'IMG_1034', 'IMG_1041', 'IMG_1057',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'thanksgiving',
    icon: Car,
    title: 'Thanksgiving',
    subtitle: 'Road Trip',
    description: 'Northern California adventures and family traditions on the open road.',
    cloudinaryTag: 'thanksgiving',
    featureImage: 'IMG_1783',
    fallbackImages: [
      'IMG_1715', 'IMG_1716', 'IMG_1720', 'IMG_1737', 'IMG_1742', 'IMG_1761',
      'IMG_1763', 'IMG_1783', 'IMG_1789', 'IMG_1815', 'IMG_1825', 'IMG_1832',
      'IMG_1839', 'IMG_1843', 'IMG_1853', 'IMG_1865', 'IMG_1868', 'IMG_1883',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
];

