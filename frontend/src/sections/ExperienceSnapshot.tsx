import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { experience } from '../content.ts';
import { Reveal } from '../components/Reveal.tsx';

// Home only needs a glance at "what I'm doing right now" — the full
// work/education timeline lives on /about.
export default function ExperienceSnapshot() {
  const current = experience.find((e) => e.type === 'work');
  if (!current) return null;

  return (
    <section className="py-20 bg-blue-100 dark:bg-blue-900/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal effect="left" className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="bg-white dark:bg-blue-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900"
          >
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ right now ]</p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{current.title}</h2>
              {current.period_label && <span className="text-xs text-gray-400 dark:text-gray-500">{current.period_label}</span>}
            </div>
            {current.organization && <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">{current.organization}</p>}
            {current.bullets && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{current.bullets[0]}</p>
            )}
          </motion.div>

          <Link
            to="/about"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-white dark:hover:bg-blue-900 hover:border-gray-300 dark:hover:border-gray-700 whitespace-nowrap"
          >
            See full experience
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

