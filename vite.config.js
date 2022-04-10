import { defineConfig } from 'vite'
import solid from 'solid-start'
import windicss from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    windicss(),
    solid({
      hot: true,
    }),
  ],
})
