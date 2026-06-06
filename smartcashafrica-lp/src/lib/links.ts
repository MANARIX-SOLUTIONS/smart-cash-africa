const appBase =
  import.meta.env.VITE_APP_URL ??
  (import.meta.env.DEV ? "http://localhost:5173" : "");

function appPath(path: string): string {
  return `${appBase}${path}`;
}

export const appLinks = {
  signup: appPath("/signup"),
  login: appPath("/login"),
  terms: appPath("/terms"),
  privacy: appPath("/privacy"),
  base: appBase,
  isExternal: Boolean(appBase),
};
