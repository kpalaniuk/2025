import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface AdventureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function AdventureCard({ icon: Icon, title, description, onClick }: AdventureCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl bg-stone-100 p-8 text-left shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Yellow accent blob */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-amber-100/80" />
      
      {/* Icon */}
      <div className="relative mb-6 inline-flex rounded-xl bg-white p-3 shadow-sm">
        <Icon className="size-6 text-amber-700" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="mb-2 text-xl font-semibold text-stone-800">{title}</h3>
        <p className="text-stone-600 leading-relaxed">{description}</p>
      </div>
    </motion.button>
  );
}

