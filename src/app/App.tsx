import { useState } from 'react';
import { motion } from 'motion/react';
import { AlbumLightbox } from './components/AlbumLightbox';
import { CloudinaryImage } from './components/CloudinaryImage';
import { 
  Sparkles, 
  Sun, 
  Grape, 
  Cake, 
  Music, 
  TreePine, 
  Heart, 
  Mountain, 
  Car,
  Instagram,
  Globe,
  Compass,
} from 'lucide-react';
import heroImage from '../assets/528630d68b161d3df4d577918773bd999ffd4bcb.png';

// Adventure albums data with images from public/pics folders
const adventures = [
  {
    id: 'italy',
    icon: Compass,
    title: 'Italy',
    subtitle: 'La Dolce Vita',
    description: 'Exploring the timeless beauty of Italy, from ancient ruins to coastal villages.',
    folder: '/pics/Italy/',
    featureImage: '/pics/Italy/IMG_9206.JPG',
    images: [
      '/pics/Italy/IMG_8904.JPG',
      '/pics/Italy/IMG_8908.JPG',
      '/pics/Italy/IMG_8920.JPG',
      '/pics/Italy/IMG_8932.JPG',
      '/pics/Italy/IMG_8939.JPG',
      '/pics/Italy/IMG_8980.JPG',
      '/pics/Italy/IMG_9001.JPG',
      '/pics/Italy/IMG_9009.JPG',
      '/pics/Italy/IMG_9024.JPG',
      '/pics/Italy/IMG_9035.JPG',
      '/pics/Italy/IMG_9049.JPG',
      '/pics/Italy/IMG_9058.JPG',
      '/pics/Italy/IMG_9086.JPG',
      '/pics/Italy/IMG_9109.JPG',
      '/pics/Italy/IMG_9143.JPG',
      '/pics/Italy/IMG_9175.JPG',
      '/pics/Italy/IMG_9206.JPG',
      '/pics/Italy/IMG_9224.JPG',
      '/pics/Italy/IMG_9237.JPG',
      '/pics/Italy/IMG_9285.JPG',
      '/pics/Italy/IMG_9294.JPG',
      '/pics/Italy/IMG_9298.JPG',
      '/pics/Italy/IMG_9309.JPG',
      '/pics/Italy/IMG_9313.JPG',
      '/pics/Italy/IMG_9408.JPG',
      '/pics/Italy/IMG_9412.JPG',
      '/pics/Italy/IMG_9438.JPG',
      '/pics/Italy/IMG_9487.JPG',
      '/pics/Italy/IMG_9508.JPG',
      '/pics/Italy/IMG_9555.JPG',
      '/pics/Italy/IMG_9583.JPG',
      '/pics/Italy/IMG_9644.JPG',
    ],
    gridClass: 'col-span-2',
  },
  {
    id: 'newyork',
    icon: Heart,
    title: 'New York',
    subtitle: 'Wedding Season',
    description: 'Celebrating love in the city that never sleeps.',
    folder: '/pics/NewYork/',
    featureImage: '/pics/NewYork/IMG_0862.JPG',
    images: [
      '/pics/NewYork/IMG_0462.jpeg',
      '/pics/NewYork/IMG_0774.JPG',
      '/pics/NewYork/IMG_0780.JPG',
      '/pics/NewYork/IMG_0785.JPG',
      '/pics/NewYork/IMG_0792.JPG',
      '/pics/NewYork/IMG_0804.JPG',
      '/pics/NewYork/IMG_0841.JPG',
      '/pics/NewYork/IMG_0862.JPG',
      '/pics/NewYork/IMG_0883.JPG',
      '/pics/NewYork/IMG_0886.JPG',
      '/pics/NewYork/IMG_0891.JPG',
      '/pics/NewYork/IMG_0897.JPG',
      '/pics/NewYork/IMG_0916.JPG',
      '/pics/NewYork/IMG_0927.JPG',
      '/pics/NewYork/IMG_0960.JPG',
      '/pics/NewYork/IMG_0970.JPG',
      '/pics/NewYork/IMG_5519.jpeg',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'sanjuans',
    icon: Mountain,
    title: 'San Juans',
    subtitle: 'Island Sailing',
    description: 'Sailing through the stunning San Juan Islands.',
    folder: '/pics/sanjuans/',
    featureImage: '/pics/sanjuans/IMG_9820.JPG',
    images: [
      '/pics/sanjuans/IMG_9764.JPG',
      '/pics/sanjuans/IMG_9768.JPG',
      '/pics/sanjuans/IMG_9779.JPG',
      '/pics/sanjuans/IMG_9787.JPG',
      '/pics/sanjuans/IMG_9800.JPG',
      '/pics/sanjuans/IMG_9820.JPG',
      '/pics/sanjuans/IMG_9858.JPG',
      '/pics/sanjuans/IMG_9886.JPG',
      '/pics/sanjuans/IMG_9897.JPG',
      '/pics/sanjuans/IMG_9898.JPG',
      '/pics/sanjuans/IMG_9904.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'desert',
    icon: Sun,
    title: 'Desert',
    subtitle: 'Friends & Freedom',
    description: 'Sun-soaked adventures and unforgettable moments in the desert landscape.',
    folder: '/pics/Desert/',
    featureImage: '/pics/Desert/DSC05518.jpg',
    images: [
      '/pics/Desert/DSC05492.jpg',
      '/pics/Desert/DSC05518.jpg',
      '/pics/Desert/DSC05526.jpg',
      '/pics/Desert/FullSizeRender.jpeg',
      '/pics/Desert/IMG_7611.JPG',
      '/pics/Desert/IMG_7623.JPG',
      '/pics/Desert/IMG_7645.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'solvang',
    icon: Grape,
    title: 'Solvang',
    subtitle: 'Wine Country',
    description: 'Wine country charm and Danish village magic with the whole family.',
    folder: '/pics/Solvang/',
    featureImage: '/pics/Solvang/IMG_8134.JPG',
    images: [
      '/pics/Solvang/IMG_5167.jpeg',
      '/pics/Solvang/IMG_5173.jpeg',
      '/pics/Solvang/IMG_8086.JPG',
      '/pics/Solvang/IMG_8106.JPG',
      '/pics/Solvang/IMG_8118.JPG',
      '/pics/Solvang/IMG_8134.JPG',
      '/pics/Solvang/IMG_8158.JPG',
      '/pics/Solvang/IMG_8170.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'birthday',
    icon: Cake,
    title: "Kyle's 40th",
    subtitle: 'The Big One',
    description: 'Celebrating the big 4-0 with friends, family, and plenty of cake.',
    folder: '/pics/KyleBday/',
    featureImage: '/pics/KyleBday/IMG_8202.JPG',
    images: [
      '/pics/KyleBday/IMG_8188.JPG',
      '/pics/KyleBday/IMG_8202.JPG',
      '/pics/KyleBday/IMG_8226 2.JPG',
      '/pics/KyleBday/IMG_8226.JPG',
      '/pics/KyleBday/IMG_8233.JPG',
      '/pics/KyleBday/IMG_8596.jpeg',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'joshuatree',
    icon: Music,
    title: 'Joshua Tree',
    subtitle: 'Music Fest',
    description: 'Desert vibes and live music under the stars at Joshua Tree.',
    folder: '/pics/JoshuaTree/',
    featureImage: '/pics/JoshuaTree/IMG_8716.JPG',
    images: [
      '/pics/JoshuaTree/IMG_6778.jpeg',
      '/pics/JoshuaTree/IMG_8690.JPG',
      '/pics/JoshuaTree/IMG_8716.JPG',
      '/pics/JoshuaTree/IMG_8723.JPG',
      '/pics/JoshuaTree/IMG_8731.JPG',
      '/pics/JoshuaTree/IMG_8735.JPG',
      '/pics/JoshuaTree/IMG_8756.JPG',
      '/pics/JoshuaTree/IMG_8765.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'oregon',
    icon: TreePine,
    title: 'Oregon',
    subtitle: 'Pacific Northwest',
    description: 'Pacific Northwest beauty with forests, coastlines, and mountain views.',
    folder: '/pics/Oregon/',
    featureImage: '/pics/Oregon/IMG_0304.JPG',
    images: [
      '/pics/Oregon/IMG_0231.JPG',
      '/pics/Oregon/IMG_0304.JPG',
      '/pics/Oregon/IMG_0330.JPG',
      '/pics/Oregon/IMG_0354.JPG',
    ],
    gridClass: '',
  },
  {
    id: 'sierras',
    icon: Mountain,
    title: 'Sierras',
    subtitle: 'Backpacking',
    description: 'High alpine adventure and wilderness exploration in the Sierra Nevada.',
    folder: '/pics/Sierras/',
    featureImage: '/pics/Sierras/IMG_1024.JPG',
    images: [
      '/pics/Sierras/IMG_1009.JPG',
      '/pics/Sierras/IMG_1012.JPG',
      '/pics/Sierras/IMG_1024.JPG',
      '/pics/Sierras/IMG_1034.JPG',
      '/pics/Sierras/IMG_1041.JPG',
      '/pics/Sierras/IMG_1057.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'thanksgiving',
    icon: Car,
    title: 'Thanksgiving',
    subtitle: 'Road Trip',
    description: 'Northern California adventures and family traditions on the open road.',
    folder: '/pics/Thanksgiving/',
    featureImage: '/pics/Thanksgiving/IMG_1783.JPG',
    images: [
      '/pics/Thanksgiving/IMG_1715.JPG',
      '/pics/Thanksgiving/IMG_1716.JPG',
      '/pics/Thanksgiving/IMG_1720.JPG',
      '/pics/Thanksgiving/IMG_1737.JPG',
      '/pics/Thanksgiving/IMG_1742.JPG',
      '/pics/Thanksgiving/IMG_1761.JPG',
      '/pics/Thanksgiving/IMG_1763.JPG',
      '/pics/Thanksgiving/IMG_1783.JPG',
      '/pics/Thanksgiving/IMG_1789.JPG',
      '/pics/Thanksgiving/IMG_1815.JPG',
      '/pics/Thanksgiving/IMG_1825.JPG',
      '/pics/Thanksgiving/IMG_1832.JPG',
      '/pics/Thanksgiving/IMG_1839.JPG',
      '/pics/Thanksgiving/IMG_1843.JPG',
      '/pics/Thanksgiving/IMG_1853.JPG',
      '/pics/Thanksgiving/IMG_1865.JPG',
      '/pics/Thanksgiving/IMG_1868.JPG',
      '/pics/Thanksgiving/IMG_1883.JPG',
    ],
    gridClass: 'md:col-span-1 md:row-span-1',
  },
];

// Photo tile component with lazy loading and dramatic hover
function PhotoTile({ 
  adventure, 
  onClick, 
  index 
}: { 
  adventure: typeof adventures[0]; 
  onClick: () => void; 
  index: number;
}) {
  const isLarge = adventure.gridClass?.includes('col-span-2');
  
  // Use larger image for feature tiles, smaller for regular tiles
  const imageWidth = isLarge ? 800 : 500;
  
  return (
    <motion.button
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer ${adventure.gridClass}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image with Cloudinary optimization */}
      <CloudinaryImage
        src={adventure.featureImage}
        alt={adventure.title}
        width={imageWidth}
        crop="fill"
        gravity="auto"
        quality="auto"
        loading={index < 4 ? 'eager' : 'lazy'}
        priority={index < 2}
        sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      
      {/* Gradient Overlay - always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      
      {/* Content - always visible */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        {/* Subtitle - shows on hover */}
        <span 
          className="text-amber-400 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
        >
          {adventure.subtitle}
        </span>
        
        {/* Title - always visible */}
        <h3 className={`text-white font-black tracking-tight leading-[0.9] mb-1 transition-all duration-300 ${isLarge ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-2xl lg:text-3xl'}`}>
          {adventure.title}
        </h3>
        
        {/* View Album indicator - shows on hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 translate-y-2 group-hover:translate-y-0">
          <span className="text-white/80 text-xs md:text-sm font-medium">View Album</span>
          <svg className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Corner icon accent */}
      <div className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
        <adventure.icon className="w-4 h-4 text-white" strokeWidth={2} />
      </div>
    </motion.button>
  );
}

export default function App() {
  const [selectedAlbum, setSelectedAlbum] = useState<typeof adventures[0] | null>(null);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-16 text-white text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              2025 Palaniuk
              <br />
              Year in Review
            </motion.h1>

            <motion.h2
              className="mb-8 text-white/90 text-[clamp(1.5rem,3vw,2.5rem)] tracking-wide font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              A year of gratitude and Growth
            </motion.h2>

            <motion.p
              className="mx-auto mb-12 max-w-2xl text-white/80 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              As we welcome 2026, we celebrate the incredible light we've shared together. Here's to the gratitude, adventure, laughter and love that made this year unforgettable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <button
                onClick={() => {
                  document.getElementById('family-letter')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 px-10 py-4 text-white shadow-2xl transition-all hover:bg-white/30 hover:scale-105"
              >
                Explore Our Year
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-12 w-6 rounded-full border-2 border-white/40">
            <motion.div
              className="mx-auto mt-2 h-2 w-2 rounded-full bg-white/60"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Family Letter Section - NOW ABOVE PHOTOS */}
      <section id="family-letter" className="px-6 py-32 bg-stone-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative">
            {/* Decorative accent */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-amber-500/50 to-amber-500" />
            
            <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-3xl p-10 md:p-14">
              <h2 className="text-center text-white mb-10 text-3xl md:text-4xl font-light tracking-tight">
                The Palaniuks' 2025
                <span className="block text-amber-400 text-lg mt-2 font-normal tracking-widest uppercase">A Year to Remember</span>
              </h2>
              
              <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light">
                <p>
                  What a year it's been for the Palaniuk family! <strong className="font-medium text-white">Bohdi</strong> and <strong className="font-medium text-white">Meta</strong> have been absolutely thriving—excelling in school, learning piano, and truly mastering the art of being good friends. They've kept us on our toes with soccer, gymnastics and jiu jitsu practices, endless creativity at home drawing and painting, and adventures near and far.
                </p>

                <p>
                  <strong className="font-medium text-white">Paige</strong> had a monumental year, with her interior design business flourishing beyond our wildest dreams. She took on over 15 new projects, and crushed them all, transforming spaces and bringing beauty into so many homes. We couldn't be prouder of her dedication and creativity.
                </p>

                <p>
                  <strong className="font-medium text-white">Kyle</strong> turned 40 this year (though he insists he's still 25 at heart!). He's been coaching local club soccer, pouring energy into his bands with big shows throughout the year, and launching the Granada House Podcast with 9 episodes and counting. Mountain biking, music shows with his three bands, and cultivating love and community through his passion running Granada House have kept his spirit young and adventurous.
                </p>

                <p>
                  As a family, we embarked on incredible journeys—exploring the magic of <strong className="font-medium text-white">Italy</strong>, sailing through the stunning <strong className="font-medium text-white">San Juan Islands</strong>, and creating countless memories together. Every adventure reminded us how blessed we are to experience the world side by side. Our newest adventure is taming two new kittens in our house, <strong className="font-medium text-white">Comet</strong> and <strong className="font-medium text-white">Queso</strong>.
                </p>

                <p className="text-stone-400 italic border-l-4 border-amber-500/50 pl-6 my-8">
                  This year, we also said goodbye to our beloved <strong className="font-medium not-italic text-stone-300">Jasper</strong>. His unwavering patience, loyalty, and gentle spirit blessed our family in ways words could never capture. Though our hearts ache without him, we carry his love with us always. His light will never be forgotten.
                </p>

                <p>
                  Here's to a bud of a new year in 2026 filled with growth, adventure, love, and gratitude. We're so thankful for the journey and for all of you who've been part of our story.
                </p>

                <div className="pt-8 text-center">
                  <p className="text-white font-medium text-xl mb-2">With all our love,</p>
                  <p className="text-stone-300 text-xl">
                    Kyle, Paige, Bohdi, and Meta 💛
                  </p>
                  <p className="text-stone-400 text-lg mt-1">
                    (and Comet and Queso 🐾)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Year in Review Section - Photo Grid */}
      <section id="year-review" className="px-4 md:px-8 py-24 bg-stone-950">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">Our Adventures</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              2025 Highlights
            </h2>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">
              Click any adventure to explore the full album
            </p>
          </motion.div>

          {/* Editorial photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[320px]">
            {adventures.map((adventure, index) => (
              <PhotoTile
                key={adventure.id}
                adventure={adventure}
                onClick={() => setSelectedAlbum(adventure)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="px-6 py-32 bg-stone-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700/50 p-12 text-center shadow-xl md:p-16"
        >
          <Sparkles className="mx-auto mb-6 size-12 text-amber-400" />
          <h2 className="mb-6 text-white text-4xl font-bold">Here's to 2026</h2>
          <p className="mb-8 text-lg text-stone-300">
            We're so grateful for you being part of our journey. May the new year bring even more joy, adventure, and unforgettable moments. Cheers to new beginnings and cherished traditions!
          </p>
          <p className="text-2xl text-amber-400">✨ Happy New Year! ✨</p>
        </motion.div>
      </section>

      {/* Stay Connected Section */}
      <section className="px-6 py-32 bg-stone-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-stone-400 text-lg">Follow our adventures and projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instagram Links */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Instagram className="size-8 text-amber-400" />
                <h3 className="text-2xl font-medium text-white">Instagram</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Paige', handle: 'granadahouseco' },
                  { name: 'Kyle', handle: 'kyle_theukrainian' },
                  { name: 'Granada House', handle: 'granadahouse' },
                  { name: 'Granada House Sessions', handle: 'granadahousesessions' },
                  { name: 'Granada House Mortgage', handle: 'granadahousegroup' },
                  { name: 'Granada House Design', handle: 'granadahouse.design' },
                ].map((item) => (
                  <a 
                    key={item.handle}
                    href={`https://instagram.com/${item.handle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-stone-800/50 rounded-xl hover:bg-stone-800 transition-all hover:scale-[1.02] group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-amber-400 transition-colors">{item.name}</p>
                      <p className="text-stone-500 text-sm">@{item.handle}</p>
                    </div>
                    <span className="text-amber-400">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Website Links */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="size-8 text-amber-400" />
                <h3 className="text-2xl font-medium text-white">Our Sites</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Granada House', url: 'granada-house.com' },
                  { name: 'Plan Prepare Home', url: 'planpreparehome.com' },
                  { name: 'Granada House Design', url: 'granadahouse.design' },
                ].map((item) => (
                  <a 
                    key={item.url}
                    href={`http://${item.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-stone-800/50 rounded-xl hover:bg-stone-800 transition-all hover:scale-[1.02] group"
                  >
                    <div>
                      <p className="font-medium text-white group-hover:text-amber-400 transition-colors">{item.name}</p>
                      <p className="text-stone-500 text-sm">{item.url}</p>
                    </div>
                    <span className="text-amber-400">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 px-6 py-8 text-center bg-stone-950">
        <p className="text-sm text-stone-500">
          With love, The Palaniuk Family • 2025 → 2026
        </p>
      </footer>

      {/* Album Lightbox */}
      <AlbumLightbox
        images={selectedAlbum?.images ?? []}
        isOpen={selectedAlbum !== null}
        onClose={() => setSelectedAlbum(null)}
        albumTitle={selectedAlbum?.title}
      />
    </div>
  );
}
