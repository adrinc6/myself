// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages under the /myself subpath.
// Every internal link must go through localizedPath() in src/i18n/utils.ts
// so that BASE_URL is applied consistently.
export default defineConfig({
  site: 'https://adrinc6.github.io',
  base: '/myself',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
