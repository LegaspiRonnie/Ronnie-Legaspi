import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function CookieConsent() {
  const [show, setShow] = useState(() => !localStorage.getItem('cookie-consent'));

  const answer = (value: 'accepted' | 'declined') => {
    localStorage.setItem('cookie-consent', value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_30px_rgba(2,6,23,0.08)]"
        >
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
              This site uses cookies — including a first-party visitor cookie used for basic visit analytics — to improve
              your browsing experience. By continuing, you agree to our use of cookies.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => answer('declined')}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-950 transition-colors duration-300"
              >
                Decline
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => answer('accepted')}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300 hover:shadow-lg hover:shadow-blue-700/25"
              >
                Accept
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
