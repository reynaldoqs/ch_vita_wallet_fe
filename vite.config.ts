import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
	resolve: {
		alias: { "@": path.resolve(__dirname, "src") },
	},
	plugins: [
		webfontDownload([
			"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
		]),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	base: "/",
});
