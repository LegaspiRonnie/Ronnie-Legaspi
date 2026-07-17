import { useUnderConstruction } from '../hooks.ts';

export default function Pricing() {
    const underConstruction = useUnderConstruction();
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mb-14">
          <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ engagement options ]</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Ways we can work together</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Starter */}
          <div
            data-reveal="true"
            className="relative bg-white dark:bg-gray-950 rounded-lg p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-none border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 in-view"
            style={{ ['--reveal-delay' as any]: '0ms' }}
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Starter</h3>
            <p className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">From ₱5,000</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              A focused landing page or a single well-defined feature.
            </p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                'One landing page or feature build',
                'Responsive, mobile-first layout',
                'Basic SEO and performance pass',
                '1 round of revisions',
                '2 weeks of post-launch fixes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={underConstruction}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-950"
            >
              Request this package
            </button>
          </div>

          {/* Professional */}
          <div
            data-reveal="true"
            className="relative bg-white dark:bg-gray-950 rounded-lg p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-none border-2 border-blue-600 ring-1 ring-blue-600/20 md:-translate-y-2 in-view"
            style={{ ['--reveal-delay' as any]: '120ms' }}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-medium">
              Most popular
            </span>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Professional</h3>
            <p className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">From ₱8,500</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              A full web app build from database to deployed UI.
            </p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                'Full-stack app (Laravel + React/Vue)',
                'Database design and API integration',
                'Authentication and admin tooling',
                'Deployment and environment setup',
                '30 days of post-launch support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={underConstruction}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] bg-blue-700 hover:bg-blue-800 text-white"
            >
              Request this package
            </button>
          </div>

          {/* Custom / Retainer */}
          <div
            data-reveal="true"
            className="relative bg-white dark:bg-gray-950 rounded-lg p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-none border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 in-view"
            style={{ ['--reveal-delay' as any]: '240ms' }}
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Custom / Retainer</h3>
            <p className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Let&apos;s talk</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              Ongoing collaboration for ongoing product needs.
            </p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {[
                'Monthly hours reserved on your project',
                'Priority response time',
                'Feature roadmap collaboration',
                'Flexible scope month to month',
                'Direct line to the developer',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={underConstruction}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-950"
            >
              Request this package
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-8 text-center">
          Prices are estimates and vary by project scope — final quotes are confirmed after a discovery call.
        </p>
      </div>
    </section>
  );
}


