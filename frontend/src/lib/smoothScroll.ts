import type Lenis from 'lenis';

// Set by <SmoothScroll /> while it's mounted. Programmatic navigation
// (hash links, "back to top") should route through this singleton instead
// of window.scrollTo/scrollIntoView so it stays in sync with Lenis's
// virtual scroll position instead of fighting it.
let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

const NAV_OFFSET = -72; // fixed navbar height + breathing room

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -11 * t));
// Long, gentle easing for programmatic jumps like "back to top" — starts
// slow, cruises, then eases in. Prevents the jarring "warp to top" feel.
const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

export function scrollToTop() {
  if (lenisInstance) {
    // Duration scales with distance so scrolling from the footer feels the
    // same speed as scrolling from mid-page — no hard "teleport".
    const distance = window.scrollY;
    const duration = Math.min(2.4, Math.max(1.2, distance / 1200));
    lenisInstance.scrollTo(0, { duration, easing: easeInOutQuint, lock: true, force: true });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function scrollToElement(el: HTMLElement) {
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.8, offset: NAV_OFFSET, easing: easeOutExpo, lock: true });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}


