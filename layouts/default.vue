<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const items = computed(() => [
  { label: 'Overview', to: '/', active: route.path === '/' },
  { label: 'Experience', to: '/experience', active: route.path === '/experience' },
  { label: 'Stack', to: '/stack', active: route.path === '/stack' },
  { label: 'About', to: '/about', active: route.path === '/about' }
])
watch(() => route.fullPath, () => { open.value = false })
</script>
<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <UHeader v-model:open="open" class="site-header">
      <template #title><span class="brand-mark" aria-hidden="true">f.</span><span class="brand-name">fajar<span class="text-muted"> / developer</span></span></template>
      <UNavigationMenu :items="items" aria-label="Main navigation" />
      <template #right><UButton to="/contact" color="neutral" variant="outline" class="nav-contact" label="Let’s talk" trailing-icon="i-lucide-arrow-up-right" /></template>
      <template #body><UNavigationMenu :items="items" orientation="vertical" aria-label="Mobile navigation" /><div class="mobile-extra"><UButton to="/contact" block label="Let’s work together" /><UButton to="/resume" block color="neutral" variant="ghost" label="View résumé" /><p class="text-muted">Based in Indonesia · UTC+7</p></div></template>
    </UHeader>
    <main id="main-content" tabindex="-1"><slot /></main>
    <AppFooter />
  </div>
</template>
