import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ProjectImageLoopProps {
  images: string[];
  alt: string;
}

// Auto-looping slideshow for project screenshots (e.g. SBIRS images
// dropped into src/assets/projects/sbirs/)
export default function ProjectImageLoop({ images, alt }: ProjectImageLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
