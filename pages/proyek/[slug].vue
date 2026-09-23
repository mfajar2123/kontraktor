<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('project-' + route.path, () => queryCollection('proyek').path(route.path).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Proyek tidak ditemukan' })
usePageSeo(() => page.value!.title, () => page.value!.description, () => page.value!.image)
</script>
<template><div v-if="page"><PageIntro :title="page.title" :description="page.description" eyebrow="Galeri Proyek"/><div class="shell wide-photo"><img :src="page.image" :alt="page.imageAlt" width="1400" height="650"/><span>Studi ilustratif — bukan proyek aktual perusahaan</span></div><section class="shell section editorial-layout"><aside class="project-facts"><p class="eyebrow">INFORMASI KONSEP</p><dl><dt>Kategori</dt><dd>{{ page.category }}</dd><dt>Lokasi ilustratif</dt><dd>{{ page.location }}</dd><dt>Tahun konsep</dt><dd>{{ page.year }}</dd><dt>Lingkup</dt><dd>{{ page.scope }}</dd></dl><NuxtLink to="/galeri" class="text-link">Kembali ke galeri <UIcon name="i-lucide-arrow-right"/></NuxtLink></aside><ContentRenderer :value="page" class="prose-content"/></section><ContactCta/></div></template>
