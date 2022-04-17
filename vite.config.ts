/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import windicss from 'vite-plugin-windicss'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [windicss(), solid()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    setupFiles: './setupVitest.ts',
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})
