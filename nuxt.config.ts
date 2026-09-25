export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  ui: { fonts: false, experimental: { componentDetection: true } },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: ['lucide:building-2', 'lucide:panels-top-left', 'lucide:ruler', 'lucide:hard-hat', 'lucide:drafting-compass', 'lucide:shield-check', 'lucide:handshake']
    }
  },
  colorMode: { preference: 'light', fallback: 'light' },
  content: { experimental: { sqliteConnector: 'native' }, build: { markdown: { highlight: false } } },
  runtimeConfig: { public: { siteUrl: '', contactEmail: '', whatsapp: '' } },
  nitro: { prerender: { crawlLinks: true, routes: ['/', '/tentang-kami', '/layanan', '/galeri', '/kontak', '/karir', '/artikel', '/faq', '/kebijakan-privasi'] } },
  app: { head: { htmlAttrs: { lang: 'id' }, meta: [{ name: 'theme-color', content: '#152b3c' }], link: [{ rel: 'preconnect', href: 'https://images.unsplash.com', crossorigin: 'anonymous' }] } }
})
