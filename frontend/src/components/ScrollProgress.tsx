import { motion, useScroll, useSpring } from 'motion/react';

// Thin progress bar pinned to the top of the viewport, scaling from 0 → 1 as
// the user scrolls the page. Spring-smoothed so it trails the raw scroll
// value with a subtle easing — same feel as linguardlabs.com.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-[2px] origin-left z-50 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700"
    />
  );
}

