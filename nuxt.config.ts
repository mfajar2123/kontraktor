export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  features: { inlineStyles: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/image'],
  image: { provider: 'ipx', domains: ['images.unsplash.com'], alias: { '/unsplash': 'https://images.unsplash.com' }, quality: 80, densities: [1, 2] },
  experimental: { defaults: { nuxtLink: { prefetchOn: { interaction: true, visibility: false } } } },
  css: ['~/assets/css/main.css'],
  ui: { fonts: false, colorMode: false, theme: { colors: ['primary', 'error'] }, experimental: { componentDetection: true } },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: ['lucide:building-2', 'lucide:panels-top-left', 'lucide:ruler', 'lucide:hard-hat', 'lucide:drafting-compass', 'lucide:shield-check', 'lucide:handshake']
    }
  },
  content: { experimental: { sqliteConnector: 'native' }, build: { markdown: { highlight: false } } },
  runtimeConfig: { public: { siteUrl: '', contactEmail: '', whatsapp: '' } },
  nitro: { compressPublicAssets: true, prerender: { autoSubfolderIndex: false, crawlLinks: true, routes: ['/', '/tentang-kami', '/layanan', '/galeri', '/kontak', '/karir', '/artikel', '/faq', '/kebijakan-privasi'] } },
  app: { head: { htmlAttrs: { lang: 'id' }, meta: [{ name: 'theme-color', content: '#152b3c' }] } }
})
