<template>
  <section class="hero shell" aria-labelledby="hero-title">
    <div class="hero-copy">
      <h1 id="hero-title">From idea to<br>interface.<br><span class="muted-heading">Built to work.</span></h1>
      <p class="hero-intro">Hi, I’m <strong>Muhamad Fajar.</strong> A full stack developer connecting thoughtful interfaces, reliable APIs, and practical DevOps.</p>
      <div class="actions"><UButton to="/contact" size="xl" label="Let’s build something" trailing-icon="i-lucide-arrow-up-right" /><UButton to="/experience" size="xl" color="neutral" variant="ghost" label="Explore my experience" trailing-icon="i-lucide-arrow-right" /></div>
      <p class="hero-location"><UIcon name="i-lucide-map-pin" /> Sukabumi, Indonesia <span>·</span> UTC+7</p>
    </div>
    <div class="hero-visual">
      <div class="orbit orbit-one" aria-hidden="true" /><div class="orbit orbit-two" aria-hidden="true" />
      <div class="portrait-frame"><NuxtImg src="/images/gagaaaa.webp" alt="Muhamad Fajar, web application developer" width="560" height="640" sizes="sm:90vw md:45vw lg:480px" format="webp" preload fetchpriority="high" class="portrait" /><div class="portrait-caption"><span>MUHAMAD FAJAR</span><span>Developer & problem solver</span></div></div>
      <div class="code-note" aria-hidden="true"><span class="code-dot" /> idea <span class="text-muted">→</span> build <span class="text-muted">→</span> ship <UIcon name="i-lucide-check" /></div>
      <span class="visual-coordinate" aria-hidden="true">01 / ALWAYS BUILDING</span>
    </div>
  </section>
</template>
