<script setup lang="ts">
const { data: intro } = await useAsyncData('career-intro', () => queryCollection('pages').path('/pages/karir').first())
const { data: jobs } = await useAsyncData('career-jobs', () => queryCollection('karir').where('active', '=', true).order('order', 'ASC').all())
const activeJobs = computed(() => jobs.value || [])
const selectedPosition = ref('')
async function selectJob(title: string) {
  selectedPosition.value = title
  await nextTick()
  const form = document.getElementById('form-lamaran')
  form?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true })
}

usePageSeo('Karir', 'Jelajahi lowongan karir PT Alpha Tunas Mandiri dan kirimkan lamaran Anda.')
</script>

<template>
  <div>
    <PageIntro :title="intro?.title || 'Bangun masa depan bersama kami.'" :description="intro?.description || 'Jelajahi kesempatan berkarir di PT Alpha Tunas Mandiri.'" eyebrow="Karir" />
    <section class="shell career-showcase" aria-label="Ilustrasi pekerjaan konstruksi">
      <div class="career-showcase-photo">
        <NuxtImg src="/unsplash/photo-1747056711958-9d8c3b97b578" alt="Pekerja membangun struktur gedung bertingkat" width="1600" height="1000" fetchpriority="high" decoding="async" sizes="sm:100vw md:53vw xl:800px" format="webp" fit="inside" />
        <span>Foto ilustrasi pekerjaan konstruksi</span>
      </div>
      <div class="career-showcase-copy">
        <p class="eyebrow">KARIR DI PT ALPHA TUNAS MANDIRI</p>
        <h2>Temukan kesempatan di lapangan yang terus bergerak.</h2>
        <p>Temukan posisi yang sesuai dengan keahlian Anda dan tumbuh bersama tim kami.</p>
        <a href="#lowongan" class="text-link">Lihat lowongan tersedia <UIcon name="i-lucide-arrow-down" /></a>
      </div>
    </section>
    <section id="lowongan" class="shell section career-section">
      <div class="career-heading">
        <div>
          <p class="eyebrow">BERGABUNG DENGAN KAMI</p>
          <h2>Temukan peran Anda.</h2>
        </div>
        <p class="muted">{{ activeJobs.length ? activeJobs.length + ' posisi tersedia' : 'Informasi lowongan terbaru' }}</p>
      </div>

      <div v-if="activeJobs.length" class="career-grid">
        <article v-for="job in activeJobs" :key="job.path" class="career-card">
          <div class="career-card-top">
            <span class="career-icon"><UIcon name="i-lucide-hard-hat" /></span>
            <span class="career-status"><span /> Sedang dibuka</span>
          </div>
          <p class="career-meta">{{ job.location }} <span>·</span> {{ job.employmentType }}</p>
          <h3>{{ job.title }}</h3>
          <p class="career-description">{{ job.description }}</p>
          <details class="career-details">
            <summary>Lihat rincian pekerjaan <UIcon name="i-lucide-chevron-down" /></summary>
            <ContentRenderer :value="job" class="prose-content" />
          </details>
          <UButton label="Lamar posisi ini" trailing-icon="i-lucide-arrow-down" size="lg" @click="selectJob(job.title)" />
        </article>
      </div>

      <div v-else class="career-empty">
        <span class="career-icon"><UIcon name="i-lucide-briefcase-business" /></span>
        <div>
          <p class="eyebrow">BELUM ADA POSISI TERSEDIA</p>
          <h2>Kesempatan baru akan hadir.</h2>
          <p>Silakan kunjungi kembali halaman ini untuk melihat lowongan yang sedang dibuka.</p>
        </div>
        <NuxtLink to="/kontak" class="text-link">Hubungi tim kami <UIcon name="i-lucide-arrow-up-right" /></NuxtLink>
      </div>
    </section>

    <LazyCareerApplication v-if="activeJobs.length" :jobs="activeJobs" :selected-position="selectedPosition" hydrate-on-visible />

  </div>
</template>
