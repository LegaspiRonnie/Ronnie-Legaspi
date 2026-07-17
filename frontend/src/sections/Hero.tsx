import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import { profile, profilePhotoUrl } from '../content.ts';
import { Stagger, StaggerItem, SplitWords } from '../components/Reveal.tsx';
import MagneticButton from '../components/MagneticButton.tsx';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(20);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax on the hero content — as the user scrolls past
  // the hero, the text drifts up slowly and fades, the portrait drifts down.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}% ${mouseY}%, rgba(79,70,229,0.14), transparent 60%)`;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 min-h-svh flex items-center"
    >
      {/* Ambient gradient backdrop with parallax drift */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(29,78,216,0.08),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent)]"
      />
      {/* Cursor-following spotlight */}
      <motion.div
        ref={spotlightRef}
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
      />

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-16">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-2xl">
           <Stagger stagger={0.12} delayChildren={0.05}>
            <StaggerItem effect="fade" duration={0.5}>
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 px-3.5 py-1.5 font-mono text-xs sm:text-sm text-blue-700 dark:text-blue-400 mb-6">
                &lt;/&gt; hello, world
              </p>
            </StaggerItem>

            <SplitWords
              as="h1"
              text={profile.hero_heading}
              stagger={0.09}
              duration={0.9}
              className="block text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter text-gray-900 dark:text-white leading-[1.08] mb-6"
            />

            <StaggerItem effect="up" duration={0.6}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-9 max-w-xl">
                {profile.hero_subheading}
              </p>
            </StaggerItem>

            <StaggerItem effect="up" duration={0.6} className="flex flex-wrap items-center gap-3">
              <MagneticButton href="#projects" strength={0.4}>
                <span className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-blue-700/25">
                  View my work
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </MagneticButton>
              <MagneticButton href="#contact" strength={0.3}>
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium transition-all duration-300 hover:scale-[1.04] hover:bg-white dark:hover:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700">
                  Get in touch
                </span>
              </MagneticButton>
            </StaggerItem>
          </Stagger>
          </motion.div>

          <motion.div
            style={{ y: imgY }}
            className="relative shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-2xl animate-pulse" />
            <div className="absolute -inset-6 -z-10 rounded-full bg-linear-to-br from-blue-200/30 to-transparent dark:from-blue-800/20 blur-3xl animate-float-slow" />
            <div className="absolute -inset-3 rounded-full border-2 border-blue-100 dark:border-blue-900/60 animate-pulse" />
            <motion.img
              src={profilePhotoUrl}
              alt={profile.name}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-48 h-48 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-xl animate-float-slow"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] font-mono text-xs leading-relaxed text-blue-900 dark:text-blue-300 select-none pointer-events-none overflow-hidden hidden lg:block">
        <pre className="absolute right-10 top-10 animate-float-slow">{`const developer = {
  name: "Ronnie Legaspi",
  stack: ["Laravel", "React.js", "MySQL", "C#"],
  focus: "full-stack development",
  learning: true,
};`}</pre>
      </div>
    </section>
  );
}
