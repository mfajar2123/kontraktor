<script setup lang="ts">
const { data: intro } = await useAsyncData('career-intro', () => queryCollection('pages').path('/pages/karir').first())
const { data: jobs } = await useAsyncData('career-jobs', () => queryCollection('karir').where('active', '=', true).order('order', 'ASC').all())
const state = reactive({ name: '', email: '', phone: '', position: '', cvUrl: '', message: '', privacy: false })
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const activeJobs = computed(() => jobs.value || [])
const positionItems = computed(() => activeJobs.value.map(job => ({ label: job.title, value: job.title })))
const subject = computed(() => 'Lamaran karir — ' + (state.position || 'posisi') + ' — ' + (state.name.trim() || 'pelamar'))

watch(activeJobs, (items) => {
  if (!items.some(job => job.title === state.position)) state.position = items[0]?.title || ''
}, { immediate: true })
watch(state, () => { if (submitStatus.value !== 'idle') submitStatus.value = 'idle' })

const validate = (value: typeof state) => {
  const errors = []
  if (value.name.trim().length < 2) errors.push({ name: 'name', message: 'Masukkan nama minimal 2 karakter.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.push({ name: 'email', message: 'Masukkan alamat email yang valid.' })
  if (!/^[+\d\s().-]+$/.test(value.phone) || !/^\d{8,15}$/.test(value.phone.replace(/\D/g, ''))) errors.push({ name: 'phone', message: 'Masukkan nomor telepon yang valid (8–15 digit).' })
  if (!value.position || !activeJobs.value.some(job => job.title === value.position)) errors.push({ name: 'position', message: 'Pilih posisi yang masih tersedia.' })
  if (!/^https?:\/\//i.test(value.cvUrl) || !URL.canParse(value.cvUrl)) errors.push({ name: 'cvUrl', message: 'Masukkan tautan CV yang valid dan dapat dibuka.' })
  if (value.message.trim().length < 10) errors.push({ name: 'message', message: 'Tulis pengantar minimal 10 karakter.' })
  if (!value.privacy) errors.push({ name: 'privacy', message: 'Persetujuan kebijakan privasi diperlukan untuk mengirim lamaran.' })
  return errors
}

function selectJob(title: string) {
  state.position = title
  document.getElementById('form-lamaran')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function submitApplication() {
  isSubmitting.value = true
  submitStatus.value = 'idle'
  try {
    const payload = new URLSearchParams({
      'form-name': 'career',
      subject: subject.value,
      'bot-field': '',
      name: state.name.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      position: state.position,
      cvUrl: state.cvUrl.trim(),
      message: state.message.trim(),
      privacy: state.privacy ? 'yes' : 'no'
    })
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    })
    if (!response.ok) throw new Error('Netlify Forms tidak menerima lamaran.')
    state.name = ''
    state.email = ''
    state.phone = ''
    state.position = activeJobs.value[0]?.title || ''
    state.cvUrl = ''
    state.message = ''
    state.privacy = false
    submitStatus.value = 'success'
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

usePageSeo('Karir', 'Jelajahi lowongan karir PT Alpha Tunas Mandiri dan kirimkan lamaran Anda.')
</script>

<template>
  <div>
    <PageIntro :title="intro?.title || 'Bangun masa depan bersama kami.'" :description="intro?.description || 'Jelajahi kesempatan berkarir di PT Alpha Tunas Mandiri.'" eyebrow="Karir" />
    <section class="shell career-showcase" aria-label="Ilustrasi pekerjaan konstruksi">
      <div class="career-showcase-photo">
        <img src="https://images.unsplash.com/photo-1747056711958-9d8c3b97b578?auto=format&fit=crop&fm=jpg&q=80&w=800" srcset="https://images.unsplash.com/photo-1747056711958-9d8c3b97b578?auto=format&fit=crop&fm=jpg&q=80&w=640 640w, https://images.unsplash.com/photo-1747056711958-9d8c3b97b578?auto=format&fit=crop&fm=jpg&q=80&w=960 960w, https://images.unsplash.com/photo-1747056711958-9d8c3b97b578?auto=format&fit=crop&fm=jpg&q=80&w=1280 1280w" sizes="(max-width: 767px) calc(100vw - 2.5rem), 53vw" alt="Pekerja membangun struktur gedung bertingkat" width="1600" height="1000" fetchpriority="high" decoding="async">
        <span>Foto ilustrasi pekerjaan konstruksi</span>
      </div>
      <div class="career-showcase-copy">
        <p class="eyebrow">KARIR DI PT ALPHA TUNAS MANDIRI</p>
        <h2>Temukan kesempatan di lapangan yang terus bergerak.</h2>
        <p>Kami membuka posisi sesuai kebutuhan proyek dan operasional. Lihat posisi yang tersedia, kemudian kirimkan lamaran Anda melalui formulir di halaman ini.</p>
        <a href="#lowongan" class="text-link">Lihat lowongan tersedia <UIcon name="i-lucide-arrow-down" /></a>
      </div>
    </section>
    <section id="lowongan" class="shell section career-section">
      <div class="career-heading">
        <div>
          <p class="eyebrow">BERGABUNG DENGAN KAMI</p>
          <h2>Temukan peran Anda.</h2>
        </div>
        <p class="muted">{{ intro?.description }}</p>
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

    <section v-if="activeJobs.length" id="form-lamaran" class="surface career-application">
      <div class="shell career-application-grid">
        <aside>
          <p class="eyebrow">FORMULIR LAMARAN</p>
          <h2>Langkah berikutnya dimulai di sini.</h2>
          <p class="muted">Ceritakan tentang diri Anda dan pilih posisi yang ingin dilamar. Pastikan tautan CV dapat dibuka oleh tim kami.</p>
          <div class="career-assurance"><UIcon name="i-lucide-shield-check" /><span>Informasi Anda digunakan untuk meninjau lamaran ini. Baca <NuxtLink to="/kebijakan-privasi">Kebijakan Privasi</NuxtLink>.</span></div>
        </aside>
        <div class="contact-panel career-form-panel">
          <div class="contact-form-heading"><span class="form-symbol"><UIcon name="i-lucide-send" /></span><span class="eyebrow">LAMARAN ANDA</span></div>
          <h2>Kenalkan diri Anda.</h2>
          <p class="form-note">Semua kolom wajib diisi.</p>
          <UForm name="career" method="post" data-netlify="true" netlify-honeypot="bot-field" :state="state" :validate="validate" class="project-form career-form" @submit="submitApplication">
            <input type="hidden" name="form-name" value="career">
            <input type="hidden" name="subject" :value="subject">
            <input type="hidden" name="bot-field" value="">
            <div class="form-grid">
              <UFormField name="name" label="Nama lengkap" required>
                <UInput v-model="state.name" name="name" placeholder="Nama Anda" autocomplete="name" class="w-full" size="xl" :maxlength="100" />
                <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
              </UFormField>
              <UFormField name="phone" label="Nomor telepon" required>
                <UInput v-model="state.phone" name="phone" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" class="w-full" size="xl" :maxlength="25" />
                <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
              </UFormField>
            </div>
            <UFormField name="email" label="Alamat email" required>
              <UInput v-model="state.email" name="email" type="email" placeholder="nama@email.com" autocomplete="email" class="w-full" size="xl" :maxlength="254" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="position" label="Posisi yang dilamar" required>
              <USelect v-model="state.position" name="position" :items="positionItems" class="w-full" size="xl" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="cvUrl" label="Tautan CV" description="Gunakan tautan yang dapat dibuka oleh tim kami." required>
              <UInput v-model="state.cvUrl" name="cvUrl" type="url" placeholder="https://..." autocomplete="url" class="w-full" size="xl" :maxlength="2000" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="message" label="Pesan pengantar" required>
              <UTextarea v-model="state.message" name="message" placeholder="Ceritakan singkat pengalaman dan alasan Anda tertarik pada posisi ini." :rows="5" :maxlength="2000" class="w-full" size="xl" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="privacy">
              <UCheckbox v-model="state.privacy" name="privacy" label="Saya menyetujui penggunaan data untuk proses peninjauan lamaran ini." />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <div class="form-submit-row"><UButton type="submit" :label="isSubmitting ? 'Mengirim…' : 'Kirim Lamaran'" :loading="isSubmitting" :disabled="isSubmitting" size="xl" trailing-icon="i-lucide-send" /><span>Lamaran dikirim aman melalui<br>formulir website kami.</span></div>
          </UForm>
          <p v-if="submitStatus === 'success'" class="form-feedback form-feedback-success" role="status">Terima kasih. Lamaran Anda sudah terkirim dan tim kami akan meninjaunya.</p>
          <p v-else-if="submitStatus === 'error'" class="form-feedback form-feedback-error" role="alert">Lamaran belum terkirim. Periksa koneksi Anda, lalu coba kembali beberapa saat lagi.</p>
        </div>
      </div>
    </section>
  </div>
</template>
