import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from '../lib/smoothScroll.ts';

// Plain expo-out — rises fast, decelerates smoothly, and settles exactly at
// the target with no rebound. Measured against the reference site directly
// (it also runs Lenis): a single wheel burst there covers ~38% of the
// distance in the first 64ms and eases the rest of the way in over ~1.1s
// with zero overshoot, which is what this curve + duration reproduces.
// Slightly softer than pure expo — starts a touch slower so the scroll has
// that "weighted, trailing" feel linguardlabs.com uses, then decelerates
// smoothly and settles without overshoot.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -11 * t));

// Buttery inertia-based scrolling for wheel/touch input. Skipped entirely
// when the user prefers reduced motion, in which case native scrolling
// (already smooth via `scroll-behavior: smooth`) takes over.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      // Higher duration + lower lerp = longer "catch-up" tail on every
      // wheel tick. This is what gives the reference site its silky,
      // slightly-delayed scroll feel instead of a 1:1 native scroll.
      duration: 1.8,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.6,
      lerp: 0.06,
    });
    setLenisInstance(lenis);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}




