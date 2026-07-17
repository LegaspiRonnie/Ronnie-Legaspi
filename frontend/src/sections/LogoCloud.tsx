import { techIconUrl } from '../content.ts';
import { Reveal } from '../components/Reveal.tsx';

const logoStack = [
  'Laravel',
  'PHP',
  'React.js',
  'Vue.js',
  'JavaScript',
  'TypeScript',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'Unity',
  'C#',
  'Git',
  'GitHub',
  'Tailwind CSS',
];

export default function LogoCloud() {
  const logos = [...logoStack, ...logoStack];

  return (
    <section className="py-20 bg-white dark:bg-blue-950 overflow-hidden">
      <Reveal effect="fade" className="relative overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-28 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />

        <div className="flex w-max animate-marquee [animation-direction:reverse] hover:[animation-play-state:paused] motion-reduce:animate-none">
          {logos.map((tech, index) => {
            const logo = techIconUrl(tech);

            return (
              <div key={index} className="group flex shrink-0 items-center gap-4 px-10">
                {logo ? (
                  <img
                    src={logo}
                    alt={tech}
                    className="h-14 w-14 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white font-bold text-xl transition-transform duration-500 group-hover:scale-110">
                    {tech[0]}
                  </div>
                )}

                <span className="text-2xl font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors duration-500 group-hover:text-gray-900 dark:group-hover:text-white">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}




