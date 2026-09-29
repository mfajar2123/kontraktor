<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const menuButton = useTemplateRef('menuButton')
function restoreMenuFocus(event: Event) {
  event.preventDefault()
  menuButton.value?.$el?.focus()
}
onMounted(() => {
  const desktop = matchMedia('(min-width: 1024px)')
  const closeOnDesktop = () => { if (desktop.matches) open.value = false }
  desktop.addEventListener('change', closeOnDesktop)
  onBeforeUnmount(() => desktop.removeEventListener('change', closeOnDesktop))
})
const companyItems = [
  { label: 'Tentang Kami', to: '/tentang-kami', description: 'Kenali perusahaan dan cara kami bekerja.' },
  { label: 'Artikel', to: '/artikel', description: 'Wawasan seputar konstruksi.' },
  { label: 'Karir', to: '/karir', description: 'Temukan kesempatan bergabung.' }
]
const items = computed(() => [
  { label: 'Beranda', to: '/', active: route.path === '/' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Galeri', to: '/galeri', active: /^\/(galeri|proyek)(\/|$)/.test(route.path) },
  { label: 'Perusahaan', active: companyItems.some(item => route.path.startsWith(item.to)), children: companyItems }
])
const mobileItems = computed(() => [...items.value, { label: 'Kontak', to: '/kontak' }])
watch(() => route.fullPath, () => { open.value = false })
</script>
<template>
  <header class="site-header sticky top-0 z-50 h-(--ui-header-height)">
    <UContainer class="flex h-full items-center justify-between gap-3">
      <NuxtLink to="/" aria-label="PT Alpha Tunas Mandiri"><BrandLogo /></NuxtLink>
      <LazyUNavigationMenu hydrate-on-media-query="(min-width: 1024px)" :items="items" content-orientation="vertical" aria-label="Navigasi utama" class="hidden lg:flex" />
      <UButton to="/kontak" label="Diskusi Proyek" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-up-right" class="header-cta" />
      <UButton ref="menuButton" aria-label="Buka menu" icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden" :aria-expanded="open" @click="open = true" />
    </UContainer>
    <LazyUModal v-if="open" v-model:open="open" fullscreen :transition="false" title="Navigasi" description="Menu utama website" :content="{ onCloseAutoFocus: restoreMenuFocus }" :ui="{ content: 'lg:hidden' }">
      <template #content>
        <div class="flex h-(--ui-header-height) shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <NuxtLink to="/" aria-label="PT Alpha Tunas Mandiri"><BrandLogo /></NuxtLink>
          <UButton aria-label="Tutup menu" icon="i-lucide-x" color="neutral" variant="ghost" @click="open = false" />
        </div>
        <div class="overflow-y-auto p-4 sm:p-6">
          <LazyUNavigationMenu :items="mobileItems" orientation="vertical" aria-label="Navigasi seluler" />
          <UButton to="/kontak" block label="Diskusikan proyek Anda" class="mt-6" />
        </div>
      </template>
    </LazyUModal>
  </header>
</template>
