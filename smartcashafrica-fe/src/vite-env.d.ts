/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
