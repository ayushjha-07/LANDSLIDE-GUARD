export const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return {
        bg: 'bg-red-500/10 dark:bg-red-950/40',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-900/60',
        dot: 'bg-red-500',
      };
    case 'high-risk':
    case 'high risk':
    case 'high':
      return {
        bg: 'bg-orange-500/10 dark:bg-orange-950/40',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-900/60',
        dot: 'bg-orange-500',
      };
    case 'warning':
    case 'advisory':
    case 'moderate':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-900/60',
        dot: 'bg-amber-500',
      };
    case 'system warning':
    case 'system-warning':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/30',
        text: 'text-amber-800 dark:text-amber-300',
        border: 'border-amber-300 dark:border-amber-800/50',
        dot: 'bg-amber-500',
      };
    case 'unknown':
    case 'offline':
      return {
        bg: 'bg-stone-500/10 dark:bg-stone-800/40',
        text: 'text-stone-600 dark:text-stone-400',
        border: 'border-stone-300 dark:border-stone-700/60',
        dot: 'bg-stone-400',
      };
    case 'normal':
    case 'online':
    case 'low':
    case 'safe':
    default:
      return {
        bg: 'bg-forest-500/10 dark:bg-forest-950/40',
        text: 'text-forest-700 dark:text-nature-400',
        border: 'border-forest-200 dark:border-forest-800/60',
        dot: 'bg-nature-500',
      };
  }
};
