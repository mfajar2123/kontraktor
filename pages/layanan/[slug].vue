<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('service-' + route.path, () => queryCollection('layanan').path(route.path).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Layanan tidak ditemukan' })
usePageSeo(() => page.value!.title, () => page.value!.description, () => page.value!.image)
</script>
<template><div v-if="page"><PageIntro :title="page.title" :description="page.description" eyebrow="Layanan & Jasa"/><div class="shell wide-photo"><img :src="page.image" :alt="page.imageAlt" width="1400" height="650"/><span>Foto ilustrasi layanan</span></div><section class="section shell editorial-layout"><aside class="detail-aside"><p class="eyebrow">SOLUSI KAMI</p><h2>{{ page.title }}</h2><p>Setiap kebutuhan memiliki pendekatan yang berbeda. Mari mulai dari rencana Anda.</p><UButton to="/kontak" label="Konsultasikan Kebutuhan" trailing-icon="i-lucide-arrow-up-right"/><NuxtLink to="/layanan" class="text-link">Kembali ke layanan</NuxtLink></aside><ContentRenderer :value="page" class="prose-content"/></section><ContactCta/></div></template>
