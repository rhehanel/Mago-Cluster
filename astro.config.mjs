import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    markdoc(),
    ...(isDev ? [keystatic()] : []),
  ],
});