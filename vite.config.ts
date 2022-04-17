import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import solid from "solid-start";

export default defineConfig({
  plugins: [windicss(), solid()],
});
