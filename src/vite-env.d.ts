/// <reference types="vite/client" />

// biome-ignore lint: ambient declaration for env vars
interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly VITE_APP_TITLE?: string;
	readonly VITE_APP_ENV?: string;
}
