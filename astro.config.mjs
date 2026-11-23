import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import sitemap from '@astrojs/sitemap';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.magocluster.com', // 실제 도메인 추가
  output: 'static',
  integrations: [
    react(),
    markdoc(),
    ...(isDev ? [keystatic()] : []),
    sitemap(),
  ],
});