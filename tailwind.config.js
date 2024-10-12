/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
				// Add more custom font families here
			},
			spacing: {
				s: "calc(8 / var(--rem) * 1rem)",
				m: "calc(16 / var(--rem) * 1rem)",
				l: "calc(32 / var(--rem) * 1rem)",
				xl: "calc(64 / var(--rem) * 1rem)",
			},
			fontSize: {
				caption: "calc(12 / var(--rem) * 1rem)",
				body: "calc(14 / var(--rem) * 1rem)",
				"sub-section-heading": "calc(14 / var(--rem) * 1rem)",
				"section-heading": "calc(16 / var(--rem) * 1rem)",
				"display-heading": "calc(24 / var(--rem) * 1rem)",
			},
			fontWeight: {
				body: "450",
				heading: "600",
				emphasis: "550",
			},
			lineHeight: {
				body: "1.5",
				heading: "1.25",
				condensed: "1.15",
			},
		},
	},
	plugins: [],
};
