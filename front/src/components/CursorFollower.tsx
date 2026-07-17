import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// A soft, springy dot that trails the cursor — the signature linguardlabs
// touch. Hidden on touch devices and when the user prefers reduced motion,
// and it grows when hovering interactive elements.
export default function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });
  const ringSx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const ringSy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // No cursor follower on touch devices or when reduced motion is on —
    // it would either not track anything or feel jittery.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || reducedMotion) return undefined;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        const el = e.target as HTMLElement | null;
        setHovering(!!el?.closest('a, button, [role="button"], input, textarea, select, label, summary'));
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.9 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: ringSx, y: ringSy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.9 : 1,
            borderColor: hovering ? 'rgba(96,165,250,0.9)' : 'rgba(96,165,250,0.35)',
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="w-9 h-9 rounded-full border"
        />
      </motion.div>
    </>
  );
}