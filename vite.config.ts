import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import solid from "solid-start";
import cloudflare from "solid-start-cloudflare-workers";

export default defineConfig({
  plugins: [
    windicss(),
    solid({
      adapter: cloudflare(),
    }),
  ],
});
