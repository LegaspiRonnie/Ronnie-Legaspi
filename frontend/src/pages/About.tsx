import { usePageTitle } from '../hooks.ts';
import Badge from '../components/Badge.tsx';
import Experience from '../sections/Experience.tsx';
import Team from '../sections/Team.tsx';
import Testimonials from '../sections/Testimonials.tsx';
import Quote from '../sections/Quote.tsx';
import { profile, profilePhotoUrl, skillGroups } from '../content.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

export default function About() {
  usePageTitle('About — Ronnie Legaspi');

  return (
    <>
      

      <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal effect="blur" className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start gap-10 lg:gap-14">
            <img
              src={profilePhotoUrl}
              alt={profile.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover border-4 border-white dark:border-gray-900 shadow-xl shrink-0"
            />
            <div>
              <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ about ]</p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-5">{profile.name}</h1>
              {profile.about_paragraph_1 && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-2xl">{profile.about_paragraph_1}</p>
              )}
              {profile.about_paragraph_2 && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">{profile.about_paragraph_2}</p>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                {profile.location && (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {profile.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-700 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  BSIT, University of Eastern Pangasinan (2022–2026)
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950/40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-12">
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ skills ]</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">What I work with</h2>
          </Reveal>

          <Stagger stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <StaggerItem key={group.name} effect="right">
                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">{group.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge key={skill} label={skill} color="gray" />
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Experience />
      <Team />
      <Testimonials />
      <Quote />
    </>
  );
}
