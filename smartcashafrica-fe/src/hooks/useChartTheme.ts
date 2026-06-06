import { useTheme } from '@/context/ThemeContext';

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return {
    isDark,
    grid: isDark ? '#2a3a52' : '#e2e8f0',
    tick: isDark ? '#8b9cb3' : '#64748b',
    tooltip: {
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2a3a52' : '#e2e8f0'}`,
      backgroundColor: isDark ? '#121a27' : '#ffffff',
      color: isDark ? '#e8edf4' : '#0f172a',
      boxShadow: isDark
        ? '0 8px 24px rgba(0,0,0,0.45)'
        : '0 4px 12px rgba(15,23,42,0.08)',
    },
  };
}
