import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import solid from '@astrojs/solid-js';
import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  adapter: node(),
  integrations: [solid(), tailwind(), partytown()]
});