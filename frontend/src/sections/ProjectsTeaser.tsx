import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../content.ts';
import { Reveal } from '../components/Reveal.tsx';

// A single-purpose CTA band — Home doesn't show project cards itself,
// it just points at the dedicated /projects page.
export default function ProjectsTeaser() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <Reveal effect="scale" className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-3">[ {projects.length} projects and counting ]</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          See what I've been building
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
          Full-stack apps, APIs, and side projects — screenshots, live demos, and source code included.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }} className="inline-block">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition-colors duration-300 hover:shadow-lg hover:shadow-blue-700/25"
          >
            View notable projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}


