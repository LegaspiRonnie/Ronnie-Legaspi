import { motion } from 'motion/react';
import { useUnderConstruction } from '../hooks.ts';

const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.106 0-2.164-.18-3.138-.512L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// Static stand-ins for the feedback + chat widgets — backend implementing soon
export default function StaticWidgets() {
  const underConstruction = useUnderConstruction();

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={underConstruction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium shadow-lg hover:shadow-xl"
        >
          <ChatIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          Feedback
        </motion.button>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={underConstruction}
          aria-label="Open chat support"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-700/30"
        >
          <ChatIcon className="w-5 h-5" />
        </motion.button>
      </div>
    </>
  );
}
