/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
    	extend: {
    		fontFamily: {
    			sans: ["Inter var", ...defaultTheme.fontFamily.sans]
    		},
    		colors: {
    			foreground: 'hsl(var(--foreground))',
    			background: 'hsl(var(--background))',
    			border: 'hsl(var(--border))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			'button-sm': 'calc(8/16 * 1rem)',
    			'button-md': 'calc(10/16 * 1rem)',
    			'button-lg': 'calc(12/16 * 1rem)',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		spacing: {
    			s: 'calc(8 / var(--rem) * 1rem)',
    			m: 'calc(16 / var(--rem) * 1rem)',
    			l: 'calc(32 / var(--rem) * 1rem)',
    			xl: 'calc(64 / var(--rem) * 1rem)'
    		},
    		fontSize: {
    			caption: 'calc(12 / var(--rem) * 1rem)',
    			body: 'calc(14 / var(--rem) * 1rem)',
    			'sub-section-heading': 'calc(14 / var(--rem) * 1rem)',
    			'section-heading': 'calc(16 / var(--rem) * 1rem)',
    			'display-heading': 'calc(24 / var(--rem) * 1rem)'
    		},
    		fontWeight: {
    			body: '450',
    			heading: '600',
    			emphasis: '550'
    		},
    		lineHeight: {
    			body: '1.5',
    			heading: '1.25',
    			condensed: '1.15'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};






// /** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
// export default {
// 	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {
// 			fontFamily: {
// 				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
				
// 			},
// 			colors: {
// 				foreground: {
// 					primary: "#000000",
// 					secondary: "#4D4D4D",
// 					muted: "#808080",
// 					inverted: "#FFFFFF",
// 					accent: "#0066CC",
// 					"accent-inverted": "#FFFFFF",
// 					success: "#28A745",
// 					"success-inverted": "#FFFFFF",
// 					warning: "#FFC107",
// 					danger: "#DC3545",
// 					"danger-inverted": "#FFFFFF",
// 					info: "#17A2B8",
// 					"info-inverted": "#FFFFFF",
// 				},
// 				background: {
// 					primary: "#FFFFFF",
// 					raised: "#F8F9FA",
// 					inset: "#E9ECEF",
// 					hover: "#F1F3F5",
// 					active: "#E2E6EA",
// 					backdrop: "rgba(0, 0, 0, 0.5)",
// 					placeholder: "#CED4DA",
// 					neutral: "#6C757D",
// 					highlight: "#E9ECEF",
// 					inverted: "#343A40",
// 					"inverted-hover": "#495057",
// 					"inverted-active": "#212529",
// 					accent: "#007BFF",
// 					"accent-hover": "#0056B3",
// 					"accent-active": "#004085",
// 					"accent-inverted": "#B8DAFF",
// 					"accent-inverted-hover": "#9FCDFF",
// 					"accent-inverted-active": "#86BFFF",
// 					success: "#D4EDDA",
// 					"success-hover": "#C3E6CB",
// 					"success-active": "#B1DFBB",
// 					"success-inverted": "#155724",
// 					warning: "#FFF3CD",
// 					"warning-hover": "#FFEEBA",
// 					"warning-active": "#FFE8A1",
// 					"warning-inverted": "#856404",
// 					danger: "#F8D7DA",
// 					"danger-hover": "#F5C6CB",
// 					"danger-active": "#F1B0B7",
// 					"danger-inverted": "#721C24",
// 					"danger-inverted-hover": "#8B2129",
// 					"danger-inverted-active": "#A52A35",
// 					info: "#D1ECF1",
// 					"info-hover": "#BEE5EB",
// 					"info-active": "#ABDDE5",
// 					"info-inverted": "#0C5460",
// 				},
// 				border: {
// 					primary: "#DEE2E6",
// 					"primary-hover": "#CED4DA",
// 					secondary: "#E9ECEF",
// 					highlight: "#80BDFF",
// 					accent: "#007BFF",
// 					success: "#28A745",
// 					warning: "#FFC107",
// 					danger: "#DC3545",
// 					info: "#17A2B8",
// 				},
// 			},
// 			borderRadius: {
// 				"button-sm": "calc(8/16 * 1rem)",
// 				"button-md": "calc(10/16 * 1rem)",
// 				"button-lg": "calc(12/16 * 1rem)",
// 			},
// 			spacing: {
// 				s: "calc(8 / var(--rem) * 1rem)",
// 				m: "calc(16 / var(--rem) * 1rem)",
// 				l: "calc(32 / var(--rem) * 1rem)",
// 				xl: "calc(64 / var(--rem) * 1rem)",
// 			},
// 			fontSize: {
// 				caption: "calc(12 / var(--rem) * 1rem)",
// 				body: "calc(14 / var(--rem) * 1rem)",
// 				"sub-section-heading": "calc(14 / var(--rem) * 1rem)",
// 				"section-heading": "calc(16 / var(--rem) * 1rem)",
// 				"display-heading": "calc(24 / var(--rem) * 1rem)",
// 			},
// 			fontWeight: {
// 				body: "450",
// 				heading: "600",
// 				emphasis: "550",
// 			},
// 			lineHeight: {
// 				body: "1.5",
// 				heading: "1.25",
// 				condensed: "1.15",
// 			},
// 		},
// 	},
// 	plugins: [],
// };
