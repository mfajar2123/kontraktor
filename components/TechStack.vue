<script setup lang="ts">
import data from '~/data/portfolio.json'
const icons = ['i-lucide-database', 'i-lucide-panels-top-left', 'i-lucide-terminal', 'i-lucide-wrench']
</script>
<template><section class="shell section page-section"><header class="page-heading"><p class="eyebrow">TOOLS WITH A PURPOSE</p><h1>The right tools.<br><span class="muted-heading">A practical mindset.</span></h1><p>My toolkit spans application development and delivery. I choose technologies around the problem and the team.</p></header><div class="stack-grid"><article v-for="(category, index) in data.skills.categories" :key="category.id" class="stack-card"><UIcon :name="icons[index]" class="stack-icon" /><h2>{{ category.title }}</h2><ul class="tag-list"><li v-for="item in category.items" :key="item">{{ item }}</li></ul></article></div></section></template>
