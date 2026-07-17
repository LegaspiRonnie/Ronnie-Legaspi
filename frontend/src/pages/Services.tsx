import { usePageTitle } from '../hooks.ts';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.tsx';
import Pricing from '../components/Pricing.tsx';

const services = [
  {
    title: 'Full-stack web applications',
    description: 'End-to-end builds from database design to a deployed, working UI — using Laravel on the backend and React or Vue on the front.',
    icon: 'M9 3v18M3 9h18M3 15h18M6 3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z',
  },
  {
    title: 'REST API development & integration',
    description: 'Secure, documented APIs with token authentication, rate limiting, role-based access control, and third-party service integration.',
    icon: 'M8.25 3.75H6a2.25 2.25 0 00-2.25 2.25v.75m18-3v.75a2.25 2.25 0 01-2.25 2.25h-.75m-15 0h15m-15 0v10.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25V6.75m-15 0h15',
  },
  {
    title: 'Database design & optimization',
    description: 'Normalized MySQL/PostgreSQL schemas, migrations, and query tuning — built to stay fast and correct as the data grows.',
    icon: 'M20.25 6.375c0 2.07-3.694 3.75-8.25 3.75s-8.25-1.68-8.25-3.75S7.444 2.625 12 2.625s8.25 1.68 8.25 3.75zM3.75 6.375v11.25c0 2.07 3.694 3.75 8.25 3.75s8.25-1.68 8.25-3.75V6.375m-16.5 3.75v3.75c0 2.07 3.694 3.75 8.25 3.75s8.25-1.68 8.25-3.75v-3.75',
  },
  {
    title: 'Bug fixes & performance tuning',
    description: 'Debugging and stabilizing existing codebases, profiling slow endpoints, and cleaning up brittle logic without a full rewrite.',
    icon: 'M12 6V4m0 2a6 6 0 016 6v3a4 4 0 01-4 4H10a4 4 0 01-4-4v-3a6 6 0 016-6zm-9 8h2m14 0h2M4.222 4.222l1.414 1.414m12.728 0l1.414-1.414',
  },
  {
    title: 'Small business & personal websites',
    description: 'Fast, responsive marketing sites and portfolios — the same care that goes into full applications, sized down appropriately.',
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
  },
];

export default function Services() {
  usePageTitle('Services — Ronnie Legaspi');

  return (
    <>
      <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-14">
            <p className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">[ services ]</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">What I can build for you</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Focused on full-stack work with Laravel and React — from a first prototype to a maintained production app.
            </p>
          </Reveal>

          <Stagger stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title} effect="scale">
                <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                    <svg className="w-5.5 h-5.5 text-blue-700 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <Pricing />
    </>
  );
}
