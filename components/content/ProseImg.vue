<script setup lang="ts">
defineProps<{ src: string; alt?: string; width?: string | number; height?: string | number }>()
</script>

<template>
  <NuxtImg :src="imageSource(src)" :alt="alt || ''" :width="width" :height="height" sizes="sm:100vw md:768px" format="webp" loading="lazy" decoding="async" />
</template>
