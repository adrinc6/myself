// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { rehypeProjectCards } from './src/plugins/rehype-project-cards.mjs';

// Deployed to GitHub Pages under the /myself subpath.
// Every internal link must go through localizedPath() in src/i18n/utils.ts
// so that BASE_URL is applied consistently.
export default defineConfig({
  site: 'https://adrinc6.github.io',
  base: '/myself',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    // Projects inside a skill page render as collapsible cards.
    rehypePlugins: [rehypeProjectCards],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
