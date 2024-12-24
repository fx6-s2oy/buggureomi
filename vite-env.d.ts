/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_KAKAO_API_KEY: string;
  readonly VITE_KAKAO_API_INTEGRITY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
