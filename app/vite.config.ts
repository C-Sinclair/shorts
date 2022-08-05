/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import windiPlugin from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    solidPlugin(),
    windiPlugin({
      scan: {
        fileExtensions: ["html", "js", "ts", "tsx", "jsx"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  define: {
    "process.env": {
      NODE_ENV: process.env.NODE_ENV,
    },
  },
});
