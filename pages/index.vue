<script setup lang="ts">
const capabilities = [
  { no: '01', icon: 'i-lucide-panels-top-left', title: 'Web applications', text: 'Responsive interfaces that make complex workflows feel straightforward.', tags: 'Vue · Nuxt · Tailwind CSS' },
  { no: '02', icon: 'i-lucide-braces', title: 'Backend & APIs', text: 'Structured APIs and data layers that connect your product’s moving parts.', tags: 'Java · Spring Boot · Node.js' },
  { no: '03', icon: 'i-lucide-cloud-upload', title: 'Delivery & DevOps', text: 'Repeatable deployments that help teams move from development to production.', tags: 'Docker · CI/CD · Cloud' }
]
</script>
<template><div>
  <HeroSection />
  <section class="technology-strip" aria-label="Core technologies"><div class="shell"><span class="eyebrow">MY EVERYDAY TOOLKIT</span><span>Vue.js</span><span>Nuxt</span><span>Spring Boot</span><span>Docker</span><span>Azure</span></div></section>
  <section class="section shell" aria-labelledby="capabilities-title"><div class="section-heading"><div><p class="eyebrow">WHAT I BRING</p><h2 id="capabilities-title">Built for the whole picture.</h2></div><p>From the first interaction<br>to the infrastructure behind it.</p></div><div class="capability-grid"><article v-for="item in capabilities" :key="item.no" class="capability"><div class="card-top"><UIcon :name="item.icon" /><span>{{ item.no }}</span></div><h3>{{ item.title }}</h3><p>{{ item.text }}</p><span class="tool-label">{{ item.tags }}</span></article></div></section>
  <section class="section shell work-preview" aria-labelledby="work-title"><div><p class="eyebrow">EXPERIENCE IN PRACTICE</p><h2 id="work-title">Learning by building.<br><span class="muted-heading">Growing through delivery.</span></h2><p class="section-description">Experience across web applications, dashboards, and backend services — with a foundation in computer engineering.</p><UButton to="/experience" color="neutral" variant="outline" label="View my journey" trailing-icon="i-lucide-arrow-right" /></div><div class="preview-list">
    <NuxtLink to="/experience#imani" class="preview-row"><span class="company-monogram">IP</span><span><strong>PT Imani Prima</strong><small>Web App Developer · 2025 — Present</small></span><UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
    <NuxtLink to="/experience#soca" class="preview-row"><span class="company-monogram">SA</span><span><strong>Soca AI</strong><small>Web Developer Intern · 2023</small></span><UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
    <NuxtLink to="/experience#metrodata" class="preview-row"><span class="company-monogram">MA</span><span><strong>Metrodata Academy</strong><small>Full Stack Developer · 2022</small></span><UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
  </div></section><ContactCta />
</div></template>
