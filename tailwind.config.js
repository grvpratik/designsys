// /** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
// export default {
//     darkMode: ["class"],
//     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
// 	theme: {
//     	extend: {
//     		fontFamily: {
//     			sans: ["Inter var", ...defaultTheme.fontFamily.sans]
//     		},
//     		colors: {
//     			foreground: 'hsl(var(--foreground))',
//     			background: 'hsl(var(--background))',
//     			border: 'hsl(var(--border))',
//     			card: {
//     				DEFAULT: 'hsl(var(--card))',
//     				foreground: 'hsl(var(--card-foreground))'
//     			},
//     			popover: {
//     				DEFAULT: 'hsl(var(--popover))',
//     				foreground: 'hsl(var(--popover-foreground))'
//     			},
//     			primary: {
//     				DEFAULT: 'hsl(var(--primary))',
//     				foreground: 'hsl(var(--primary-foreground))'
//     			},
//     			secondary: {
//     				DEFAULT: 'hsl(var(--secondary))',
//     				foreground: 'hsl(var(--secondary-foreground))'
//     			},
//     			muted: {
//     				DEFAULT: 'hsl(var(--muted))',
//     				foreground: 'hsl(var(--muted-foreground))'
//     			},
//     			accent: {
//     				DEFAULT: 'hsl(var(--accent))',
//     				foreground: 'hsl(var(--accent-foreground))'
//     			},
//     			destructive: {
//     				DEFAULT: 'hsl(var(--destructive))',
//     				foreground: 'hsl(var(--destructive-foreground))'
//     			},
//     			input: 'hsl(var(--input))',
//     			ring: 'hsl(var(--ring))',
//     			chart: {
//     				'1': 'hsl(var(--chart-1))',
//     				'2': 'hsl(var(--chart-2))',
//     				'3': 'hsl(var(--chart-3))',
//     				'4': 'hsl(var(--chart-4))',
//     				'5': 'hsl(var(--chart-5))'
//     			}
//     		},
//     		borderRadius: {
//     			'button-sm': 'calc(8/16 * 1rem)',
//     			'button-md': 'calc(10/16 * 1rem)',
//     			'button-lg': 'calc(12/16 * 1rem)',
//     			lg: 'var(--radius)',
//     			md: 'calc(var(--radius) - 2px)',
//     			sm: 'calc(var(--radius) - 4px)'
//     		},
//     		spacing: {
//     			s: 'calc(8 / var(--rem) * 1rem)',
//     			m: 'calc(16 / var(--rem) * 1rem)',
//     			l: 'calc(32 / var(--rem) * 1rem)',
//     			xl: 'calc(64 / var(--rem) * 1rem)'
//     		},
//     		fontSize: {
//     			caption: 'calc(12 / var(--rem) * 1rem)',
//     			body: 'calc(14 / var(--rem) * 1rem)',
//     			'sub-section-heading': 'calc(14 / var(--rem) * 1rem)',
//     			'section-heading': 'calc(16 / var(--rem) * 1rem)',
//     			'display-heading': 'calc(24 / var(--rem) * 1rem)'
//     		},
//     		fontWeight: {
//     			body: '450',
//     			heading: '600',
//     			emphasis: '550'
//     		},
//     		lineHeight: {
//     			body: '1.5',
//     			heading: '1.25',
//     			condensed: '1.15'
//     		}
//     	}
//     },
// 	plugins: [require("tailwindcss-animate")],
// };

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				foreground: {
					primary: "var(--ui-color-foreground-primary)",
					secondary: "var(--ui-color-foreground-secondary)",
					muted: "var(--ui-color-foreground-muted)",
					inverted: "var(--ui-color-foreground-inverted)",
					accent: "var(--ui-color-foreground-accent)",
					"accent-inverted": "var(--ui-color-foreground-accent-inverted)",
					success: "var(--ui-color-foreground-success)",
					"success-inverted": "var(--ui-color-foreground-success-inverted)",
					warning: "var(--ui-color-foreground-warning)",
					danger: "var(--ui-color-foreground-danger)",
					"danger-inverted": "var(--ui-color-foreground-danger-inverted)",
					info: "var(--ui-color-foreground-info)",
					"info-inverted": "var(--ui-color-foreground-info-inverted)",
				},
				background: {
					primary: "var(--ui-color-background-primary)",
					raised: "var(--ui-color-background-raised)",
					inset: "var(--ui-color-background-inset)",
					hover: "var(--ui-color-background-hover)",
					active: "var(--ui-color-background-active)",
					backdrop: "var(--ui-color-background-backdrop)",
					placeholder: "var(--ui-color-background-placeholder)",
					neutral: "var(--ui-color-background-neutral)",
					highlight: "var(--ui-color-background-highlight)",
					inverted: "var(--ui-color-background-inverted)",
					"inverted-hover": "var(--ui-color-background-inverted-hover)",
					"inverted-active": "var(--ui-color-background-inverted-active)",
					accent: "var(--ui-color-background-accent)",
					"accent-hover": "var(--ui-color-background-accent-hover)",
					"accent-active": "var(--ui-color-background-accent-active)",
					"accent-inverted": "var(--ui-color-background-accent-inverted)",
					"accent-inverted-hover":
						"var(--ui-color-background-accent-inverted-hover)",
					"accent-inverted-active":
						"var(--ui-color-background-accent-inverted-active)",
					success: "var(--ui-color-background-success)",
					"success-hover": "var(--ui-color-background-success-hover)",
					"success-active": "var(--ui-color-background-success-active)",
					"success-inverted": "var(--ui-color-background-success-inverted)",
					warning: "var(--ui-color-background-warning)",
					"warning-hover": "var(--ui-color-background-warning-hover)",
					"warning-active": "var(--ui-color-background-warning-active)",
					"warning-inverted": "var(--ui-color-background-warning-inverted)",
					danger: "var(--ui-color-background-danger)",
					"danger-hover": "var(--ui-color-background-danger-hover)",
					"danger-active": "var(--ui-color-background-danger-active)",
					"danger-inverted": "var(--ui-color-background-danger-inverted)",
					"danger-inverted-hover":
						"var(--ui-color-background-danger-inverted-hover)",
					"danger-inverted-active":
						"var(--ui-color-background-danger-inverted-active)",
					info: "var(--ui-color-background-info)",
					"info-hover": "var(--ui-color-background-info-hover)",
					"info-active": "var(--ui-color-background-info-active)",
					"info-inverted": "var(--ui-color-background-info-inverted)",
				},
				border: {
					primary: "var(--ui-color-border-primary)",
					"primary-hover": "var(--ui-color-border-primary-hover)",
					secondary: "var(--ui-color-border-secondary)",
					highlight: "var(--ui-color-border-highlight)",
					accent: "var(--ui-color-border-accent)",
					success: "var(--ui-color-border-success)",
					warning: "var(--ui-color-border-warning)",
					danger: "var(--ui-color-border-danger)",
					info: "var(--ui-color-border-info)",
				},
			},
			borderRadius: {
				"button-sm": "calc(8/16 * 1rem)",
				"button-md": "calc(10/16 * 1rem)",
				"button-lg": "calc(12/16 * 1rem)",
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
	plugins: [require("tailwindcss-animate")],
};
