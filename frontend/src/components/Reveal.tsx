import { motion, type HTMLMotionProps, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const effects = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  blur: { hidden: { opacity: 0, y: 28, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
} satisfies Record<string, Variants>;

type Effect = keyof typeof effects;

type RevealProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport' | 'transition'> & {
  children: ReactNode;
  effect?: Effect;
  delay?: number;
  duration?: number;
  once?: boolean;
};

// Scroll-triggered entrance for a single element. Replays every time it
// re-enters the viewport by default, so scrolling back up re-animates a
// section instead of leaving it static.
export function Reveal({ children, effect = 'up', delay = 0, duration = 0.9, once = false, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: '0px 0px -12% 0px' }}
      variants={effects[effect]}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> & {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
};

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// Wraps a grid/list of <StaggerItem> children so they cascade in one after
// another, driven by a single viewport observer on the parent instead of one
// per card.
export function Stagger({ children, stagger = 0.12, delayChildren = 0, once = false, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15, margin: '0px 0px -10% 0px' }}
      variants={containerVariants(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<'div'>, 'variants'> & {
  children: ReactNode;
  effect?: Effect;
  duration?: number;
};

export function StaggerItem({ children, effect = 'up', duration = 0.8, ...rest }: StaggerItemProps) {
  return (
    <motion.div variants={effects[effect]} transition={{ duration, ease: EASE }} {...rest}>
      {children}
    </motion.div>
  );
}

// Word-by-word reveal for large headings. Each word rises and un-blurs in
// sequence, driven by a single viewport observer on the parent — same
// pattern linguardlabs.com uses on its hero and section titles.
type SplitWordsProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export function SplitWords({
  text,
  className,
  as = 'span',
  stagger = 0.08,
  delay = 0,
  duration = 0.8,
  once = false,
}: SplitWordsProps) {
  const Tag = motion[as];
  const words = text.split(' ');
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] mr-[0.28em] align-baseline">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0, filter: 'blur(8px)' },
              show: { y: '0%', opacity: 1, filter: 'blur(0px)' },
            }}
            transition={{ duration, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}


