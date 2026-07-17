import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { quotes } from '../content.ts';
import { Reveal } from '../components/Reveal.tsx';

export default function Quote() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const next = () => {
    clearTimeout(timeoutRef.current);
    setIndex((current) => {
      if (quotes.length < 2) return current;
      let newIndex = current;
      while (newIndex === current) {
        newIndex = Math.floor(Math.random() * quotes.length);
      }
      return newIndex;
    });
  };

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => {
      clearInterval(timer);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900/40 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <Reveal effect="fade">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-8">[ words to code by ]</p>
        </Reveal>

        <div className="relative min-h-[9rem] flex flex-col items-center justify-center">
          <svg className="w-10 h-10 text-blue-100 dark:text-blue-900/60 mb-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed">{quotes[index].text}</p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-mono">— {quotes[index].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={next}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-white dark:hover:bg-gray-950 transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Another one
        </motion.button>
      </div>
    </section>
  );
}


