import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.js",
			name: "Fragmenter",
			formats: ["es", "cjs", "umd"],
			fileName: (format) => {
				if (format === "es") return "fragmenter.js";
				if (format === "cjs") return "fragmenter.cjs";
				return "fragmenter.umd.js";
			},
		},
		rollupOptions: {
			external: ["event-emitter"],
		},
	},
});
