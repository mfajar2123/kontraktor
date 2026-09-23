<script setup lang="ts">
const { data: page } = await useAsyncData('privacy-page', () => queryCollection('pages').path('/pages/kebijakan-privasi').first())
usePageSeo('Kebijakan Privasi', 'Informasi penggunaan data dan layanan pihak ketiga di website ini.')
</script>
<template><div><PageIntro title="Kebijakan Privasi" description="Transparansi tentang informasi yang Anda bagikan."/><section class="shell section article-body"><ContentRenderer v-if="page" :value="page" class="prose-content"/></section></div></template>
