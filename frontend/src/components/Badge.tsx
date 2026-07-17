const colors = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  gray: 'bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300',
  green: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400',
} as const;

interface BadgeProps {
  label: string;
  color?: keyof typeof colors;
  className?: string;
}

export default function Badge({ label, color = 'blue', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${colors[color] ?? colors.blue} ${className}`}>
      {label}
    </span>
  );
}
