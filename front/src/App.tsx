import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import StaticWidgets from './components/StaticWidgets.tsx';
import SmoothScroll from './components/SmoothScroll.tsx';
import ScrollProgress from './components/ScrollProgress.tsx';
import CursorFollower from './components/CursorFollower.tsx';
import { UnderConstructionProvider, UnderConstructionModal } from './components/UnderConstruction.tsx';
import { scrollToElement, scrollToTop } from './lib/smoothScroll.ts';

const Home = lazy(() => import('./pages/Home.tsx'));
const Projects = lazy(() => import('./pages/Projects.tsx'));
const Certificates = lazy(() => import('./pages/Certificates.tsx'));
const Build = lazy(() => import('./pages/Build.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Insights = lazy(() => import('./pages/Insights.tsx'));
const InsightShow = lazy(() => import('./pages/InsightShow.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

// On route change: honor #hash anchors, otherwise scroll to top
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        scrollToElement(el);
        return;
      }
    }
    scrollToTop();
  }, [pathname, hash]);

  return null;
}

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PageLoader() {
  return <div className="min-h-screen bg-white dark:bg-gray-950" />;
}

export default function App() {
  const location = useLocation();

  return (
    <UnderConstructionProvider>
      <SmoothScroll />
      <ScrollProgress />
      <CursorFollower />
      <ScrollManager />
      <Navbar />

      <main className="pt-16">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
              <Route path="/build" element={<PageTransition><Build /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
              <Route path="/insights/:slug" element={<PageTransition><InsightShow /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <CookieConsent />
      <StaticWidgets />
      <UnderConstructionModal />
    </UnderConstructionProvider>
  );
}
