
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports= {
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
