import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md', '.mdx'],

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx', '.md', '.mdx']
    })
  ],

  kit: {
    adapter: adapter()
  }
};

export default config;
