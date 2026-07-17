import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useUnderConstruction } from '../hooks.ts';

const MotionLink = motion.create(Link);

const SunIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.696 17.304l-1.06 1.06m12.728 0l-1.06-1.06M6.696 6.696L5.636 5.636M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
);

const MoonIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const CalendarIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// Every entry is a real, distinct page now — no in-page section anchors.
const navItems = [
  { key: 'home', to: '/', label: 'Home' },
  { key: 'projects', to: '/projects', label: 'Projects' },
  { key: 'certificates', to: '/certificates', label: 'Certificates' },
  { key: 'build', to: '/build', label: 'Build' },
  { key: 'services', to: '/services', label: 'Services' },
  { key: 'about', to: '/about', label: 'About' },
  { key: 'insights', to: '/insights', label: 'Insights' },
  { key: 'contact', to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  // Dark is the default for first-time visitors — only an explicit "light"
  // choice (persisted below) opts back out, mirroring index.html's inline
  // pre-paint script so there's no flash on first load.
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const underConstruction = useUnderConstruction();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (item: (typeof navItems)[number]) =>
    item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`);

  const mobileItemClass = (item: (typeof navItems)[number]) =>
    `block px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-950 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300 ${
      isActive(item) ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-gray-950' : ''
    }`;

  const closeMenu = () => setMenuOpen(false);

  const themeButton = (extra = '') => (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      className={`relative overflow-hidden p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 ${extra}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {dark ? MoonIcon : SunIcon}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );

  // No Calendly account yet — this opens the same "under construction" modal
  // used elsewhere for stubbed features. Swap in a real Calendly link (and
  // make this a plain <a>) once an account exists.
  const bookACallButton = (extra = '') => (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={underConstruction}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium transition-colors duration-300 hover:bg-white dark:hover:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 ${extra}`}
    >
      {CalendarIcon}
      Book a call
    </motion.button>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white/75 dark:bg-gray-950/75 backdrop-blur-md transition-all duration-300 border-b ${
        scrolled ? 'border-gray-200 dark:border-gray-800 shadow-sm shadow-gray-900/5 bg-white/90 dark:bg-gray-950/90' : 'border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="group flex items-center gap-1.5 font-semibold text-lg tracking-tight text-gray-900 dark:text-white shrink-0">
            <span className="inline-block text-blue-600 dark:text-blue-400 font-mono transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-110">&lt;/&gt;</span>
            <span>
              Ronnie<span className="text-blue-700 dark:text-blue-500">.dev</span>
            </span>
          </Link>

          <ul className="hidden xl:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.key} className="relative py-1">
                  <Link
                    to={item.to}
                    className={`relative inline-block whitespace-nowrap transition-colors duration-300 ${
                      active ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'hover:text-blue-700 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-blue-700 dark:bg-blue-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {themeButton('hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300')}
            {bookACallButton()}
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300 hover:shadow-lg hover:shadow-blue-700/25"
            >
              Work with me
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MotionLink>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            {themeButton()}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-800 transition-colors duration-300"
            >
              <motion.svg
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-1 pt-2 pb-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link to={item.to} onClick={closeMenu} className={mobileItemClass(item)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  {bookACallButton('w-full justify-center')}
                </li>
                <li>
                  <MotionLink
                    to="/contact"
                    onClick={closeMenu}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300"
                  >
                    Work with me
                  </MotionLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}


