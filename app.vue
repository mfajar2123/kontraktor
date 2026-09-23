<script setup lang="ts">
import { id } from '@nuxt/ui/locale'
const route = useRoute()
const config = useRuntimeConfig()
const origin = String(config.public.siteUrl).replace(/\/$/, '')
useHead(() => ({ htmlAttrs: { lang: 'id' }, titleTemplate: '%s | PT Alpha Tunas Mandiri', link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }, ...(origin ? [{ rel: 'canonical', href: origin + route.path }] : [])] }))
useSeoMeta({ ogSiteName: 'PT Alpha Tunas Mandiri', ogLocale: 'id_ID', ogType: 'website', twitterCard: 'summary_large_image' })
</script>
<template><UApp :locale="id"><NuxtLayout><NuxtPage /></NuxtLayout></UApp></template>
