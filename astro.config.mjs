import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  adapter: netlify(),
  integrations: [solid(), tailwind(), partytown()],
});
