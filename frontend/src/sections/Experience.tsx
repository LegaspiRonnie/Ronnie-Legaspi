import { experience } from '../content.ts';
import type { ExperienceEntry } from '../types.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

interface EntryProps {
  entry: ExperienceEntry;
  isLast: boolean;
  filledDot?: boolean;
}

function Entry({ entry, isLast, filledDot }: EntryProps) {
  return (
    <StaggerItem effect="left" className={`relative ${isLast ? '' : 'pb-8'}`}>
      <div
        className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ${
          filledDot ? 'bg-blue-700 border-2 border-white dark:border-gray-950' : 'border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-950'
        }`}
      ></div>
      {entry.period_label && <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{entry.period_label}</p>}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">{entry.title}</h3>
      {entry.organization && <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">{entry.organization}</p>}
      {entry.bullets ? (
        <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed list-disc list-outside ml-4">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : (
        entry.description && (
          <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${entry.organization ? '' : 'mt-2'}`}>{entry.description}</p>
        )
      )}
    </StaggerItem>
  );
}

export default function Experience() {
  const workEntries = experience.filter((e) => e.type === 'work');
  const otherEntries = experience.filter((e) => ['education', 'note'].includes(e.type));

  return (
    <section id="experience" className="py-20 bg-white dark:bg-blue-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ experience ]</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Relevant experience &amp; education</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Stagger stagger={0.15} className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white dark:bg-blue-950"></div>
            {workEntries.map((entry, i) => (
              <Entry key={entry.id} entry={entry} isLast={i === workEntries.length - 1} filledDot />
            ))}
          </Stagger>

          <Stagger stagger={0.15} className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white dark:bg-blue-950"></div>
            {otherEntries.map((entry, i) => (
              <Entry key={entry.id} entry={entry} isLast={i === otherEntries.length - 1} filledDot={entry.type === 'education'} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}




