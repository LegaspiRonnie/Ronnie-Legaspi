import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePageTitle } from '../hooks.ts';

export default function NotFound() {
  usePageTitle('Page not found — Ronnie Legaspi');

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 py-24"
      >
        <p className="font-mono text-sm text-blue-700 dark:text-blue-400 mb-3">[ 404 ]</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition-colors duration-300 hover:shadow-lg hover:shadow-blue-700/25">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}


