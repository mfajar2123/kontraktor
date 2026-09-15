<script setup lang="ts">
import data from '~/data/portfolio.json'
const route = useRoute()
const config = useRuntimeConfig()
const titles: Record<string, string> = { '/': 'Full Stack Developer', '/experience': 'Experience', '/stack': 'Technologies & Tools', '/about': 'About & Education', '/contact': 'Contact', '/resume': 'Résumé' }
const descriptions: Record<string, string> = {
  '/': 'Muhamad Fajar builds modern web applications, REST APIs, and deployment workflows. Explore his experience, skills, and ways to work together.',
  '/experience': 'Explore Muhamad Fajar’s web development experience at PT Imani Prima, Soca AI, and Metrodata Academy.',
  '/stack': 'Explore the backend, frontend, and DevOps tools Muhamad Fajar uses to build and deliver web applications.',
  '/about': 'Meet Muhamad Fajar, a Computer Engineering graduate based in Sukabumi, Indonesia. View education and professional certifications.',
  '/contact': 'Discuss a web development project or hiring opportunity with Muhamad Fajar by email, WhatsApp, or LinkedIn.',
  '/resume': 'View and print Muhamad Fajar’s résumé, including work experience, technical skills, education, and certifications.'
}
const title = computed(() => `Muhamad Fajar — ${titles[route.path] || 'Portfolio'}`)
const description = computed(() => descriptions[route.path] || descriptions['/'])
const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
const baseUrl = String(config.app.baseURL).replace(/\/?$/, '/')
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogType: 'website', ogLocale: 'en_US', twitterCard: 'summary_large_image', ogImage: siteUrl ? `${siteUrl}/images/gagaaaa.webp` : undefined, twitterImage: siteUrl ? `${siteUrl}/images/gagaaaa.webp` : undefined })
useHead(() => ({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}favicon.ico?v=2` },
    ...(siteUrl ? [{ rel: 'canonical', href: `${siteUrl}${route.path}` }] : [])
  ],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person', name: 'Muhamad Fajar', jobTitle: 'Web App Developer', description: data.hero.bio,
    ...(siteUrl ? { url: siteUrl, image: `${siteUrl}/images/gagaaaa.webp` } : {}),
    sameAs: ['https://github.com/mfajar2123', 'https://linkedin.com/in/mfajar2123'],
    alumniOf: { '@type': 'CollegeOrUniversity', name: data.education.items[0].school }
  }).replace(/</g, '\\u003c') }]
}))
</script>
<template><UApp><NuxtLayout><NuxtPage /></NuxtLayout></UApp></template>
