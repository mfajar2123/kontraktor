<script setup lang="ts">defineProps<{ title: string; description?: string; eyebrow?: string }>()</script>
<template><section class="page-intro"><div class="shell"><UBreadcrumb :items="[{ label: 'Beranda', to: '/' }, { label: eyebrow || title }]"/><p class="eyebrow">{{ eyebrow || 'PT Alpha Tunas Mandiri' }}</p><h1>{{ title }}</h1><p class="lead">{{ description }}</p></div></section></template>
