import { useTheme } from '@/context/ThemeContext';

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return {
    isDark,
    grid: isDark ? '#334155' : '#E2E8F0',
    tick: isDark ? '#94A3B8' : '#64748B',
    tooltip: {
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      color: isDark ? '#F1F5F9' : '#0F172A',
      boxShadow: isDark
        ? '0 4px 12px rgba(0,0,0,0.3)'
        : '0 4px 12px rgba(0,0,0,0.06)',
    },
  };
}
