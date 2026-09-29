<script setup lang="ts">
const state = reactive({ name: '', email: '', phone: '', position: '', cvUrl: '', message: '', privacy: false })
const isSubmitting = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const props = defineProps<{ jobs: { title: string }[]; selectedPosition?: string }>()
const activeJobs = computed(() => props.jobs)
const positionItems = computed(() => activeJobs.value.map(job => ({ label: job.title, value: job.title })))
const subject = computed(() => 'Lamaran karir — ' + (state.position || 'posisi') + ' — ' + (state.name.trim() || 'pelamar'))

watch(activeJobs, (items) => {
  if (!items.some(job => job.title === state.position)) state.position = items[0]?.title || ''
}, { immediate: true })
async function focusApplicant() {
  await nextTick()
  const section = document.getElementById('form-lamaran')
  section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  section?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true })
}
onMounted(() => { if (props.selectedPosition) focusApplicant() })
watch(() => props.selectedPosition, async title => {
  if (title && activeJobs.value.some(job => job.title === title)) {
    state.position = title
    await nextTick()
    if (import.meta.client) focusApplicant()
  }
}, { immediate: true })
watch(state, () => { if (submitStatus.value !== 'idle') submitStatus.value = 'idle' }, { flush: 'sync' })

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


async function submitApplication() {
  if (isSubmitting.value) return
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
</script>
<template>
    <section id="form-lamaran" class="surface career-application">
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
          <p class="form-note">Semua kolom wajib diisi. Siapkan tautan CV yang dapat diakses.</p>
          <UForm name="career" method="post" data-netlify="true" netlify-honeypot="bot-field" :state="state" :disabled="!ready" :validate="validate" class="project-form career-form" @submit="submitApplication">
            <input type="hidden" name="form-name" value="career">
            <input type="hidden" name="subject" :value="subject">
            <input type="hidden" name="bot-field" value="">
            <div class="form-grid">
              <UFormField name="name" label="Nama lengkap" required>
                <UInput id="career-name" v-model="state.name" name="name" placeholder="Nama Anda" autocomplete="name" class="w-full" size="xl" :maxlength="100" />
                <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
              </UFormField>
              <UFormField name="phone" label="Nomor telepon" required>
                <UInput id="career-phone" v-model="state.phone" name="phone" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" class="w-full" size="xl" :maxlength="25" />
                <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
              </UFormField>
            </div>
            <UFormField name="email" label="Alamat email" required>
              <UInput id="career-email" v-model="state.email" name="email" type="email" placeholder="nama@email.com" autocomplete="email" class="w-full" size="xl" :maxlength="254" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="position" label="Posisi yang dilamar" required>
              <USelect id="career-position" v-model="state.position" name="position" :items="positionItems" class="w-full" size="xl" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="cvUrl" label="Tautan CV" description="Gunakan tautan yang dapat dibuka oleh tim kami." required>
              <UInput id="career-cvUrl" v-model="state.cvUrl" name="cvUrl" type="url" placeholder="https://..." autocomplete="url" class="w-full" size="xl" :maxlength="2000" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="message" label="Pesan pengantar" required>
              <UTextarea id="career-message" v-model="state.message" name="message" placeholder="Ceritakan singkat pengalaman dan alasan Anda tertarik pada posisi ini." :rows="5" :maxlength="2000" class="w-full" size="xl" />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="privacy">
              <UCheckbox id="career-privacy" v-model="state.privacy" name="privacy" label="Saya menyetujui penggunaan data untuk proses peninjauan lamaran ini." />
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <div class="form-submit-row"><UButton type="submit" :label="isSubmitting ? 'Mengirim…' : 'Kirim Lamaran'" :loading="isSubmitting" :disabled="!ready || isSubmitting" size="xl" trailing-icon="i-lucide-send" /><span>Lamaran dikirim aman melalui<br>formulir website kami.</span></div>
          </UForm>
          <p v-if="submitStatus === 'success'" class="form-feedback form-feedback-success" role="status">Terima kasih. Lamaran Anda sudah terkirim dan tim kami akan meninjaunya.</p>
          <p v-else-if="submitStatus === 'error'" class="form-feedback form-feedback-error" role="alert">Lamaran belum terkirim. Periksa koneksi Anda, lalu coba kembali beberapa saat lagi.</p>
        </div>
      </div>
    </section>
</template>
