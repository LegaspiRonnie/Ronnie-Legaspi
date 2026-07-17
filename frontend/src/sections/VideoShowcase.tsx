import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../components/Reveal.tsx';

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayVideo(true);
        }
      },
      {
        threshold: 0.6, // Start when about 60% of the section is visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="video-showcase" ref={sectionRef} className="py-20 bg-white dark:bg-blue-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ demo reel ]</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">See it in action</h2>
        </Reveal>

        <Reveal effect="scale" duration={0.8}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 aspect-video transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900"
          >
            {playVideo ? (
              <iframe
                className="w-full h-full animate-fade-in"
                src="https://www.youtube.com/embed/XVlfLsdsafs?autoplay=1&mute=1&playsinline=1&rel=0"
                title="Project Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full bg-white dark:bg-blue-900 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-700 dark:text-blue-400 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

