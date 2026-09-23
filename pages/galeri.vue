<script setup lang="ts">
const { data: projects } = await useAsyncData('all-projects', () => queryCollection('proyek').order('order', 'ASC').all())
const category = ref('Semua')
const categories = computed(() => ['Semua', ...new Set(projects.value?.map(p => p.category))])
const filtered = computed(() => projects.value?.filter(p => category.value === 'Semua' || p.category === category.value) || [])
usePageSeo('Galeri Proyek', 'Jelajahi portofolio ilustratif konstruksi, hunian, renovasi, dan infrastruktur PT Alpha Tunas Mandiri.')
</script>
<template><div><PageIntro title="Setiap ruang punya cerita." description="Menjelajahi kemungkinan melalui bentuk, material, dan fungsi. Kumpulan konsep proyek sebagai gambaran solusi kami." eyebrow="Galeri Proyek"/><section class="shell section"><div class="filter-row" role="group" aria-label="Filter kategori proyek"><UButton v-for="item in categories" :key="item" :label="item" :variant="category === item ? 'solid' : 'outline'" :color="category === item ? 'primary' : 'neutral'" :aria-pressed="category === item" @click="category = item"/></div><p class="result-count" role="status">{{ filtered.length }} proyek ilustratif ditampilkan</p><div class="cards three"><ContentCard v-for="project in filtered" :key="project.path" :item="project"/></div><p class="caption">Seluruh proyek, lokasi, dan tahun adalah data contoh. Foto stok bukan dokumentasi pekerjaan perusahaan.</p></section><ContactCta/></div></template>
