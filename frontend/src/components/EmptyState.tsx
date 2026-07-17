interface EmptyStateProps {
  title?: string;
  message?: string | null;
  icon?: string | null;
  className?: string;
}

const defaultIcon =
  'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-2.5 5.5a2 2 0 01-1.8 1.5H8.3a2 2 0 01-1.8-1.5L4 13m16 0h-4.5a1 1 0 00-.9.6l-.6 1.4H9l-.6-1.4a1 1 0 00-.9-.6H4';

export default function EmptyState({ title = 'Nothing here yet', message = null, icon = null, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon ?? defaultIcon} />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      {message && <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">{message}</p>}
    </div>
  );
}
