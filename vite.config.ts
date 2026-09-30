import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = Object.values(bundle).find((file) => file.fileName === 'index.html')
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue
        const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${file.fileName}"[^>]*>`)
        if (!link.test(source)) continue
        source = source.replace(link, () => `<style>${String(file.source)}</style>`)
        delete bundle[file.fileName]
      }
      html.source = source
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
