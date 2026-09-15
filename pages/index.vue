<script setup lang="ts">
const toolkit = ref<HTMLElement | null>(null);
const toolkitVisible = ref(false);
const capabilitiesSection = ref<HTMLElement | null>(null);
const experienceSection = ref<HTMLElement | null>(null);
let disposeReveal = () => {};
onMounted(() => {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Map<Element, Animation>();
  let previousScroll = window.scrollY;
  let scrollingDown = true;
  const trackDirection = () => {
    const currentScroll = window.scrollY;
    if (currentScroll !== previousScroll)
      scrollingDown = currentScroll > previousScroll;
    previousScroll = currentScroll;
  };
  const toolkitObserver = new IntersectionObserver(([entry]) => {
    toolkitVisible.value = !!entry?.isIntersecting;
  });
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          animations.get(entry.target)?.cancel();
          animations.delete(entry.target);
          continue;
        }
        if (motion.matches || !scrollingDown) continue;
        const section = entry.target.querySelector("section");
        if (!section) continue;
        animations.get(entry.target)?.cancel();
        animations.set(
          entry.target,
          section.animate(
            [
              {
                transform: "scale(0.65)",
                opacity: 0.35,
                clipPath: "inset(calc(50% - 64px) calc(50% - 64px) round 16px)",
              },
              {
                transform: "scale(1)",
                opacity: 1,
                clipPath: "inset(0px 0px round 0px)",
              },
            ],
            { duration: 1000, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          ),
        );
      }
    },
    { threshold: 0, rootMargin: "0px 0px -48px 0px" },
  );
  const cancel = () => {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  };
  if (toolkit.value) toolkitObserver.observe(toolkit.value);
  // Observe stable wrappers so scaling the sections cannot retrigger the observer.
  for (const section of [capabilitiesSection.value, experienceSection.value]) {
    if (section) revealObserver.observe(section);
  }
  window.addEventListener("scroll", trackDirection, { passive: true });
  motion.addEventListener("change", cancel);
  disposeReveal = () => {
    toolkitObserver.disconnect();
    revealObserver.disconnect();
    cancel();
    window.removeEventListener("scroll", trackDirection);
    motion.removeEventListener("change", cancel);
  };
});
onBeforeUnmount(() => disposeReveal());

const capabilities = [
  {
    no: "01",
    icon: "i-lucide-panels-top-left",
    title: "Web applications",
    text: "Responsive interfaces that make complex workflows feel straightforward.",
    tags: "Vue · Nuxt · Tailwind CSS",
  },
  {
    no: "02",
    icon: "i-lucide-braces",
    title: "Backend & APIs",
    text: "Structured APIs and data layers that connect your product’s moving parts.",
    tags: "Java · Spring Boot · Node.js",
  },
  {
    no: "03",
    icon: "i-lucide-cloud-upload",
    title: "Delivery & DevOps",
    text: "Repeatable deployments that help teams move from development to production.",
    tags: "Docker · CI/CD · Cloud",
  },
];
</script>
<template>
  <div>
    <HeroSection />
    <section
      ref="toolkit"
      class="technology-strip"
      :class="{ 'toolkit-visible': toolkitVisible }"
      aria-label="Core technologies"
    >
      <div class="shell">
        <span class="eyebrow">MY EVERYDAY TOOLKIT</span><span>Vue.js</span
        ><span>Nuxt</span><span>Express.js</span><span>SQL</span
        ><span>Docker</span>
      </div>
    </section>
    <div ref="capabilitiesSection">
      <section class="section shell" aria-labelledby="capabilities-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">WHAT I BRING</p>
            <h2 id="capabilities-title">Built for the whole picture.</h2>
          </div>
          <p>
            From the first interaction<br />to the infrastructure behind it.
          </p>
        </div>
        <div class="capability-grid">
          <article
            v-for="item in capabilities"
            :key="item.no"
            class="capability"
          >
            <div class="card-top">
              <UIcon :name="item.icon" /><span>{{ item.no }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <span class="tool-label">{{ item.tags }}</span>
          </article>
        </div>
      </section>
    </div>
    <div ref="experienceSection">
      <section class="section shell work-preview" aria-labelledby="work-title">
        <div>
          <p class="eyebrow">EXPERIENCE IN PRACTICE</p>
          <h2 id="work-title">
            Learning by building.<br /><span class="muted-heading"
              >Growing through delivery.</span
            >
          </h2>
          <p class="section-description">
            Experience across web applications, dashboards, and backend services
            — with a foundation in computer engineering.
          </p>
          <UButton
            to="/experience"
            color="neutral"
            variant="outline"
            label="View my journey"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
        <div class="preview-list">
          <NuxtLink to="/experience#imani" class="preview-row"
            ><span class="company-monogram">IP</span
            ><span
              ><strong>PT Imani Prima</strong
              ><small>Web App Developer · 2025 — Present</small></span
            ><UIcon name="i-lucide-arrow-up-right"
          /></NuxtLink>
          <NuxtLink to="/experience#soca" class="preview-row"
            ><span class="company-monogram">SA</span
            ><span
              ><strong>Soca AI</strong
              ><small>Web Developer Intern · 2023</small></span
            ><UIcon name="i-lucide-arrow-up-right"
          /></NuxtLink>
          <NuxtLink to="/experience#metrodata" class="preview-row"
            ><span class="company-monogram">MA</span
            ><span
              ><strong>Metrodata Academy</strong
              ><small>Full Stack Developer · 2022</small></span
            ><UIcon name="i-lucide-arrow-up-right"
          /></NuxtLink>
        </div>
      </section>
    </div>
    <ContactCta />
  </div>
</template>

<style scoped>
.technology-strip .shell {
  padding-block: 2.6rem;
}
@media (prefers-reduced-motion: no-preference) {
  .technology-strip .shell > span {
    animation: toolkit-wave 2.2s ease-in-out infinite;
    animation-play-state: paused;
  }
  .technology-strip.toolkit-visible .shell > span {
    animation-play-state: running;
  }
  .technology-strip .shell > span:nth-child(2) {
    animation-delay: -0.26s;
  }
  .technology-strip .shell > span:nth-child(3) {
    animation-delay: -0.52s;
  }
  .technology-strip .shell > span:nth-child(4) {
    animation-delay: -0.78s;
  }
  .technology-strip .shell > span:nth-child(5) {
    animation-delay: -1.04s;
  }
  .technology-strip .shell > span:nth-child(6) {
    animation-delay: -1.3s;
  }
  @keyframes toolkit-wave {
    0%,
    100% {
      transform: translateY(-7px);
    }
    50% {
      transform: translateY(7px);
    }
  }
}
@media print {
  .technology-strip .shell > span {
    animation: none;
    transform: none;
  }
}
</style>
