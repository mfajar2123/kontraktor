<script setup lang="ts">
const { data: company } = await useCompany()
usePageSeo('Pertanyaan Umum', 'Jawaban tentang layanan, proses konsultasi, biaya, jadwal, dan kerja sama proyek.')
</script>
<template><div><PageIntro title="Informasi sebelum kita memulai." description="Jawaban awal untuk membantu Anda menyiapkan rencana pembangunan." eyebrow="Pertanyaan Umum"/><section class="shell section faq-page"><UAccordion :items="company?.faq || []"/></section><ContactCta/></div></template>

