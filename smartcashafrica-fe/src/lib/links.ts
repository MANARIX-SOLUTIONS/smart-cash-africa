const lpBase =
  import.meta.env.VITE_LP_URL ??
  (import.meta.env.DEV ? 'http://localhost:5174' : '');

export const lpLinks = {
  home: lpBase || '/',
  isExternal: Boolean(lpBase),
};
