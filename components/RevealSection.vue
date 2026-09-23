<script setup lang="ts">
const root = ref<HTMLElement>()
let dispose = () => {}
onMounted(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  let animation: Animation | undefined
  let lastY = window.scrollY
  let down = true
  const track = () => { down = window.scrollY >= lastY; lastY = window.scrollY }
  const cancel = () => animation?.cancel()
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return cancel()
    if (motion.matches || !down || !root.value?.firstElementChild) return
    animation = root.value.firstElementChild.animate([{ transform: 'scale(.94)', opacity: .35, clipPath: 'inset(4% 4% round 2px)' }, { transform: 'scale(1)', opacity: 1, clipPath: 'inset(0% 0% round 0px)' }], { duration: 850, easing: 'cubic-bezier(.4,0,.2,1)' })
  }, { rootMargin: '0px 0px -32px 0px' })
  if (root.value) observer.observe(root.value)
  window.addEventListener('scroll', track, { passive: true })
  motion.addEventListener('change', cancel)
  dispose = () => { observer.disconnect(); cancel(); window.removeEventListener('scroll', track); motion.removeEventListener('change', cancel) }
})
onBeforeUnmount(() => dispose())
</script>
<template><div ref="root"><div><slot/></div></div></template>
