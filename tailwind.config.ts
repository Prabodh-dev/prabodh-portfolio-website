import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          dark: '#080808',        // near-black (bg-primary)
          darker: '#000000',      // pure black
          purple: '#c8c8ff',      // pale lavender glow (ghost-glow)
          pink: '#e8e8f0',        // soft ghost white
          cyan: '#f0f0f0',        // text-primary
          blue: '#ffffff',        // pure white
          green: '#e8e8f0',       // ghost-white
          orange: '#888899',      // text-muted
          yellow: '#e8e8f0',      // ghost-white
          gray: '#0f0f0f',        // card/panel bg (bg-secondary)
          lightgray: '#1a1a1a',   // slightly lighter panel
        },
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
        retro: ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 10px rgba(200, 200, 255, 0.3), 0 0 20px rgba(200, 200, 255, 0.15)',
        'neon-cyan': '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
        'neon-pink': '0 0 10px rgba(232, 232, 240, 0.3), 0 0 20px rgba(232, 232, 240, 0.15)',
        'neon-green': '0 0 10px rgba(232, 232, 240, 0.3), 0 0 20px rgba(232, 232, 240, 0.15)',
        'ghost-glow': '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wisp': 'wisp 8s ease-in-out infinite',
        'blink': 'blink 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'scaleIn': 'scaleIn 0.2s ease-out',
        'eyeSquint': 'eyeSquint 0.1s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)' },
          '100%': { textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wisp: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.3' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-100vh) translateX(30px)', opacity: '0' },
        },
        blink: {
          '0%, 90%, 100%': { opacity: '1' },
          '95%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        eyeSquint: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.2)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
