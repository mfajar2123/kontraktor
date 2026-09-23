<script setup lang="ts">
const { data: items } = await useAsyncData('all-services', () => queryCollection('layanan').order('order', 'ASC').all())
const { data: company } = await useCompany()
usePageSeo('Layanan & Jasa', 'Konstruksi gedung, renovasi interior, perencanaan desain, dan pekerjaan sipil PT Alpha Tunas Mandiri.')
</script>
<template><div><PageIntro title="Solusi tepat untuk setiap rencana." description="Dari kebutuhan pertama hingga detail terakhir, kami membantu Anda menyusun langkah pembangunan yang terarah." eyebrow="Layanan & Jasa"/><section class="shell section"><div class="cards two"><ContentCard v-for="item in items" :key="item.path" :item="item"/></div></section><section class="surface section"><div class="shell"><p class="eyebrow">ALUR KERJA</p><h2>Dari percakapan menjadi kenyataan.</h2><div class="steps light-steps"><div v-for="(step,i) in company?.steps" :key="step.title"><span class="step-number">0{{ i+1 }}</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p></div></div></div></section><ContactCta/></div></template>
