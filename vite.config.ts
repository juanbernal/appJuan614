import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Strict check for production build
  const catalogUrl = process.env.VITE_CATALOG_SHEET_URL || env.VITE_CATALOG_SHEET_URL;
  const upcomingUrl = process.env.VITE_UPCOMING_SHEET_URL || env.VITE_UPCOMING_SHEET_URL;

  if (mode === 'production') {
    if (!catalogUrl || !upcomingUrl) {
      const availableKeys = Object.keys(process.env).filter(k => k.startsWith('VITE_'));
      throw new Error(`
        CRITICAL BUILD ERROR: Missing Spreadsheet URLs!
        VITE_CATALOG_SHEET_URL: ${catalogUrl ? 'FOUND' : 'MISSING'}
        VITE_UPCOMING_SHEET_URL: ${upcomingUrl ? 'FOUND' : 'MISSING'}
        
        Available VITE_ variables found in build: [${availableKeys.join(', ')}]
        
        Action required: 
        1. Ensure "Production" environment is checked in Vercel Settings.
        2. Ensure there are NO SPACES in the names.
        3. Double check the Project name in Vercel.
      `);
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
