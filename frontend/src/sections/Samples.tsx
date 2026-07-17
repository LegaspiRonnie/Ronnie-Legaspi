import Lightbox from '../components/Lightbox.tsx';
import EmptyState from '../components/EmptyState.tsx';
import { samples } from '../content.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

export default function Samples() {
  return (
    <section id="samples" className="py-20 bg-white dark:bg-gray-950/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ case studies ]</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Sample work &amp; screenshots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">A closer look at real, deployed work — click any screenshot to view it full-size.</p>
        </Reveal>

        {samples.length === 0 && <EmptyState title="No samples yet" message="Screenshots of past work will show up here soon." />}

        <Stagger stagger={0.15} className="flex flex-col gap-6">
          {samples.map((sample) => (
            <StaggerItem key={sample.slug} effect="right">
              <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{sample.title}</h3>
                    {sample.description && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">{sample.description}</p>}
                  </div>
                  {sample.url && (
                    <a href={sample.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 shrink-0 text-sm font-medium text-blue-700 dark:text-blue-400 hover:gap-2.5 transition-all duration-300">
                      Visit live site
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>

                {sample.images.length > 0 ? (
                  <Lightbox images={sample.images.map((src, n) => ({ src, alt: `${sample.title} — screenshot ${n + 1}` }))} />
                ) : (
                  <EmptyState title="Screenshots coming soon" message="I'm still uploading previews for this project." />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
