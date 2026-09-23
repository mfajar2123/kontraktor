<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
let cleanup = () => {}

onMounted(() => {
  const surface = canvas.value
  const hero = surface?.parentElement
  const ctx = surface?.getContext('2d')
  if (!surface || !hero || !ctx) return

  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const pointer = matchMedia('(hover: hover) and (pointer: fine)')
  const sparks: { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number }[] = []
  let width = 0
  let height = 0
  let frame = 0
  let previous = 0
  let active = false
  let visible = true
  let x = 0
  let y = 0
  let angle = 0
  let emission = 0
  const enabled = () => !motion.matches && pointer.matches && visible && !document.hidden

  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
    previous = 0
    sparks.length = 0
    ctx!.clearRect(0, 0, width, height)
  }

  function draw(time: number) {
    frame = 0
    if (!enabled()) { stop(); return }
    const dt = Math.min((time - (previous || time)) / 1000, 0.032)
    previous = time
    ctx!.clearRect(0, 0, width, height)
    angle += dt * 2.4
    if (active) {
      emission += dt * 32
      while (emission >= 1 && sparks.length < 60) {
        emission--
        const a = angle + Math.random() * Math.PI * 2
        const radius = 30 + Math.random() * 80
        const life = 0.45 + Math.random() * 0.65
        sparks.push({ x: x + Math.cos(a) * radius, y: y + Math.sin(a) * radius,
          vx: Math.cos(a) * 24 - Math.sin(a) * 38,
          vy: Math.sin(a) * 24 + Math.cos(a) * 38,
          life, max: life, size: 2.5 + Math.random() * 2.5 })
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i]!
      p.life -= dt
      if (p.life <= 0) { sparks.splice(i, 1); continue }
      p.x += p.vx * dt
      p.y += p.vy * dt
      const fade = Math.sin(Math.PI * p.life / p.max)
      ctx!.strokeStyle = `rgba(232,121,66,${fade * 0.55})`
      ctx!.lineWidth = p.size
      ctx!.lineCap = 'round'
      ctx!.beginPath()
      ctx!.moveTo(p.x, p.y)
      ctx!.lineTo(p.x - p.vx * 0.13, p.y - p.vy * 0.13)
      ctx!.stroke()
    }
    if (active || sparks.length) frame = requestAnimationFrame(draw)
    else previous = 0
  }

  function move(event: PointerEvent) {
    if (!enabled() || event.pointerType === 'touch') return
    const bounds = hero!.getBoundingClientRect()
    x = event.clientX - bounds.left
    y = event.clientY - bounds.top
    active = true
    if (!frame) frame = requestAnimationFrame(draw)
  }
  function leave() { active = false; emission = 0 }
  function reset() { leave(); stop() }
  const resize = new ResizeObserver(() => {
    const bounds = hero.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    const dpr = Math.min(devicePixelRatio || 1, 2)
    surface.width = Math.round(width * dpr)
    surface.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  })
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
    if (!visible) reset()
  })
  resize.observe(hero)
  observer.observe(hero)
  hero.addEventListener('pointermove', move, { passive: true })
  hero.addEventListener('pointerleave', leave)
  motion.addEventListener('change', reset)
  pointer.addEventListener('change', reset)
  document.addEventListener('visibilitychange', reset)
  cleanup = () => {
    reset()
    resize.disconnect()
    observer.disconnect()
    hero.removeEventListener('pointermove', move)
    hero.removeEventListener('pointerleave', leave)
    motion.removeEventListener('change', reset)
    pointer.removeEventListener('change', reset)
    document.removeEventListener('visibilitychange', reset)
  }
})
onBeforeUnmount(() => cleanup())
</script>

<template>
  <canvas ref="canvas" class="hero-particles" aria-hidden="true" />
</template>

<style scoped>
.hero-particles { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
@media (prefers-reduced-motion: reduce), (hover: none), print {
  .hero-particles { display: none; }
}
</style>
