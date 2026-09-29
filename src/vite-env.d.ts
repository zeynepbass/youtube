/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAPIDAPI_KEY: string
  readonly VITE_REGION_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
