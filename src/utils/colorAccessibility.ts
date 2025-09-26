const gradientMap: Record<string, string> = {
  'from-green-500 to-emerald-600': 'from-emerald-700 via-emerald-800 to-emerald-900',
  'from-blue-500 to-cyan-600': 'from-blue-700 via-cyan-800 to-slate-900',
  'from-purple-500 to-indigo-600': 'from-indigo-700 via-violet-800 to-indigo-900',
  'from-orange-500 to-red-600': 'from-orange-700 via-red-800 to-rose-900',
  'from-red-500 to-pink-600': 'from-rose-700 via-rose-800 to-rose-900',
  'from-indigo-500 to-purple-600': 'from-indigo-700 via-indigo-800 to-purple-900',
  'from-teal-600 to-green-700': 'from-emerald-700 via-emerald-800 to-teal-900',
  'from-cyan-600 to-blue-700': 'from-cyan-700 via-sky-800 to-slate-900',
  'from-slate-600 to-gray-800': 'from-slate-700 via-slate-800 to-gray-900',
  'from-blue-600 to-indigo-600': 'from-blue-700 via-indigo-800 to-slate-900',
  'from-green-600 to-green-700': 'from-emerald-700 via-emerald-800 to-emerald-900',
  'from-orange-500 to-red-500': 'from-orange-700 via-red-800 to-rose-900',
  'from-blue-400 to-blue-600': 'from-blue-700 via-indigo-800 to-slate-900',
  'from-red-400 to-orange-600': 'from-rose-700 via-red-800 to-orange-900',
  'from-green-400 to-emerald-600': 'from-emerald-700 via-emerald-800 to-emerald-900',
  'from-teal-400 to-cyan-600': 'from-teal-700 via-cyan-800 to-slate-900',
  'from-purple-400 to-indigo-600': 'from-indigo-700 via-violet-800 to-indigo-900',
  'from-cyan-400 to-blue-600': 'from-cyan-700 via-blue-800 to-slate-900',
  'from-green-500 to-lime-600': 'from-emerald-700 via-lime-800 to-emerald-900',
  'from-blue-500 to-indigo-700': 'from-blue-700 via-indigo-800 to-slate-900',
  'from-yellow-400 to-orange-500': 'from-amber-600 via-orange-700 to-amber-900',
  'from-amber-400 to-yellow-600': 'from-amber-600 via-amber-700 to-yellow-900',
  'from-green-600 to-emerald-600': 'from-emerald-700 via-emerald-800 to-emerald-900',
  'from-green-500 to-emerald-600 via-green-700': 'from-emerald-700 via-emerald-800 to-emerald-900',
};

const DEFAULT_GRADIENT = 'from-emerald-700 via-emerald-800 to-emerald-900';

export const focusRingClasses = [
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-emerald-300',
  'dark:focus-visible:ring-emerald-500',
  'focus-visible:ring-offset-white',
  'dark:focus-visible:ring-offset-gray-900',
].join(' ');

export const getAccessibleGradient = (gradient?: string, fallback: string = DEFAULT_GRADIENT) => {
  if (!gradient) return fallback;
  return gradientMap[gradient] ?? fallback;
};
