import { usePageTitle } from '../hooks.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';

// No certificates uploaded yet — these are intentionally-labeled
// placeholders so the layout is ready the moment real ones exist.
const placeholders = [
  { title: 'Certificate title', issuer: 'Issuing organization', period: 'Expected 2026' },
  { title: 'Certificate title', issuer: 'Issuing organization', period: 'Expected 2026' },
  { title: 'Certificate title', issuer: 'Issuing organization', period: 'Expected 2026' },
];

export default function Certificates() {
  usePageTitle('Certificates — Ronnie Legaspi');

  return (
    <>
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal effect="fade" className="max-w-xl mb-12">
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ certificates ]</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Certifications &amp; training</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Currently pursuing a few professional certifications — this page will fill in as they're earned.
            </p>
          </Reveal>

          <Stagger stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholders.map((cert, i) => (
              <StaggerItem key={i} effect="scale">
                <div className="group bg-white dark:bg-gray-950 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-300 dark:hover:border-blue-800">
                  <div className="aspect-4/3 flex items-center justify-center bg-white dark:bg-gray-950/60">
                    <svg
                      className="w-12 h-12 text-gray-300 dark:text-gray-700 transition-transform duration-500 group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z"
                      />
                    </svg>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-400 dark:text-gray-600">{cert.title}</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{cert.issuer}</p>
                    <p className="text-xs text-gray-300 dark:text-gray-700 mt-3">{cert.period}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
