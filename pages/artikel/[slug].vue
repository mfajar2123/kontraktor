<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('article-' + route.path, () => queryCollection('artikel').path(route.path).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
const { data: related } = await useAsyncData('related-' + route.path, () => queryCollection('artikel').where('path', '<>', route.path).limit(2).all())
const shareStatus = ref('')
async function share() { try { await navigator.clipboard.writeText(window.location.href); shareStatus.value = 'Tautan berhasil disalin.' } catch { shareStatus.value = 'Tautan tidak dapat disalin. Salin alamat dari browser Anda.' } }
usePageSeo(() => page.value!.title, () => page.value!.description, () => page.value!.image)
</script>
<template><div v-if="page"><PageIntro :title="page.title" :description="page.description" eyebrow="Artikel & Wawasan"/><div class="shell article-meta"><span>{{ page.category }} / {{ new Date(page.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) }} / {{ page.readingTime }} baca</span><UButton label="Salin Tautan" icon="i-lucide-link" variant="outline" color="neutral" @click="share"/><span role="status">{{ shareStatus }}</span></div><div class="shell wide-photo"><img :src="page.image" :alt="page.imageAlt" width="1400" height="650"/></div><section class="shell section article-body"><ContentRenderer :value="page" class="prose-content"/><NuxtLink to="/artikel" class="text-link">Kembali ke semua artikel <UIcon name="i-lucide-arrow-right"/></NuxtLink></section><section class="surface section"><div class="shell"><p class="eyebrow">BACA JUGA</p><h2>Perspektif lainnya.</h2><div class="cards two related"><ContentCard v-for="article in related" :key="article.path" :item="article"/></div></div></section></div></template>
