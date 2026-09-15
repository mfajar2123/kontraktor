export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  ui: { fonts: false },
  colorMode: { preference: 'dark', fallback: 'dark' },
  image: { format: ['webp'], quality: 80 },
  runtimeConfig: { public: { siteUrl: '' } },
  nitro: { prerender: { routes: ['/', '/experience', '/stack', '/about', '/contact', '/resume'] } },
  app: { head: { htmlAttrs: { lang: 'en' }, link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }], meta: [{ name: 'theme-color', content: '#101211' }] } }
})
