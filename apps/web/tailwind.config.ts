import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0A0C10',
        panel: '#121722',
        text: '#E7ECF3',
        muted: '#95A2B8',
        accent: '#5D8CFF',
      },
    },
  },
  plugins: [],
};

export default config;
