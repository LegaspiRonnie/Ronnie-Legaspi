import { usePageTitle } from '../hooks.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

const steps = [
  {
    title: 'Discover',
    description: 'Understand the goal, the users, and the constraints before writing a line of code — what problem is actually being solved, and for whom.',
  },
  {
    title: 'Plan & design',
    description: 'Map out data models, API contracts, and UI flows. Small, well-defined pieces beat one big upfront blueprint.',
  },
  {
    title: 'Develop',
    description: 'Build with Laravel and React/Vue in small, testable increments — committing often, keeping the app runnable at every step.',
  },
  {
    title: 'Test & refine',
    description: 'Debug edge cases, monitor performance, and polish the UX until it feels right — not just until it works.',
  },
  {
    title: 'Deploy & support',
    description: "Ship it, watch how it behaves in the real world, and keep improving based on what actually happens after launch.",
  },
];

export default function Build() {
  usePageTitle('How I Build — Ronnie Legaspi');

  return (
    <>
      <section className="py-16 bg-white dark:bg-blue-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal effect="fade" className="max-w-xl mb-14">
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ how I build ]</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">From idea to shipped product</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              The same five-stage process behind every project on this site, scaled to fit the size of the problem.
            </p>
          </Reveal>

          <Stagger stagger={0.15} className="relative pl-8">
            <div className="absolute left-2.75 top-1 bottom-1 w-px bg-gray-200 dark:bg-blue-900"></div>
            {steps.map((step, i) => (
              <StaggerItem key={step.title} effect="left" className={`relative ${i === steps.length - 1 ? '' : 'pb-10'}`}>
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center border-2 border-white dark:border-gray-950">
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

