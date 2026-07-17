import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// A wrapper that translates its child toward the cursor within a small
// radius, then springs back on leave. Same "sticky" hover linguardlabs.com
// uses on its CTAs and nav links.
type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number; // 0..1, how far the child follows the cursor
};

export default function MagneticButton({ children, className, href, onClick, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      {children}
    </motion.span>
  );

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`inline-block ${className ?? ''}`}>
      {href ? (
        <a href={href} onClick={onClick} className="inline-flex">
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className="inline-flex">
          {inner}
        </button>
      )}
    </div>
  );
}

