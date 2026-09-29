<script setup lang="ts">
defineProps<{ src: string }>()
const frame = ref<HTMLIFrameElement>()
const visible = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    visible.value = true
    observer?.disconnect()
  }, { rootMargin: '200px' })
  if (frame.value) observer.observe(frame.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <iframe ref="frame" :src="visible ? src : undefined" title="Peta lokasi kantor dummy di Sukabumi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen class="office-map" />
</template>
