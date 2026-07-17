import { Link } from 'react-router-dom';

const Chevron = () => (
  <svg className="w-3.5 h-3.5 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// items: array of { label, to? } — the last item is the current page
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300">Home</Link>
            <Chevron />
          </li>
          {items.map((item, i) =>
            i === items.length - 1 ? (
              <li key={item.label} aria-current="page">
                <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
              </li>
            ) : (
              <li key={item.label} className="flex items-center gap-2">
                <Link to={item.to ?? '/'} className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300">{item.label}</Link>
                <Chevron />
              </li>
            ),
          )}
        </ol>
      </div>
    </nav>
  );
}


