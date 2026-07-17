import { Link } from 'react-router-dom';
import { profile } from '../content.ts';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="group flex items-center gap-1.5 font-semibold text-lg tracking-tight text-gray-900 dark:text-white w-fit">
              <span className="inline-block text-blue-600 dark:text-blue-400 font-mono transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-110">&lt;/&gt;</span>
              <span>
                Ronnie<span className="text-blue-700 dark:text-blue-500">.dev</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              BSIT graduate building web and software applications with Laravel, React.js, PHP, and MySQL — eager to
              grow a career in software development.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Navigate</h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Home</Link></li>
              <li><Link to="/projects" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Projects</Link></li>
              <li><Link to="/certificates" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Certificates</Link></li>
              <li><Link to="/build" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Build</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/services" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Services</Link></li>
              <li><Link to="/about" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">About</Link></li>
              <li><Link to="/insights" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Insights</Link></li>
              <li><Link to="/contact" className="inline-flex items-center hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Connect</h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </li>
              {profile.phone && (
                <li>
                  <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile.website_url && (
                <li>
                  <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-400 hover:translate-x-1 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" />
                    </svg>
                    {profile.website_url.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-gray-400 dark:text-gray-600">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
