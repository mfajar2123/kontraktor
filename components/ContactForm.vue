<script setup lang="ts">
const state = reactive({ name: '', phone: '', email: '', message: '' })
const isSubmitting = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const subject = computed(() => 'Pesan kontak website — ' + (state.name.trim() || 'baru'))
const validate = (value: typeof state) => {
  const errors = []
  if (value.name.trim().length < 2) errors.push({ name: 'name', message: 'Masukkan nama minimal 2 karakter.' })
  if (!/^[+\d\s().-]+$/.test(value.phone) || !/^\d{8,15}$/.test(value.phone.replace(/\D/g, ''))) errors.push({ name: 'phone', message: 'Masukkan nomor telepon yang valid (8–15 digit).' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.push({ name: 'email', message: 'Masukkan alamat email yang valid.' })
  if (value.message.trim().length < 10) errors.push({ name: 'message', message: 'Tulis pesan minimal 10 karakter.' })
  return errors
}
watch(state, () => { if (submitStatus.value !== 'idle') submitStatus.value = 'idle' }, { flush: 'sync' })
async function submitContact() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitStatus.value = 'idle'
  try {
    const payload = new URLSearchParams({
      'form-name': 'contact',
      subject: subject.value,
      'bot-field': '',
      name: state.name.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      message: state.message.trim()
    })
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    })
    if (!response.ok) throw new Error('Netlify Forms tidak menerima pesan.')
    state.name = ''
    state.phone = ''
    state.email = ''
    state.message = ''
    submitStatus.value = 'success'
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
      <div class="contact-panel">
        <div class="contact-form-heading"><span class="form-symbol"><UIcon name="i-lucide-send"/></span><span class="eyebrow">PESAN UNTUK KAMI</span></div>
        <h2>Kirim pesan Anda.</h2>
        <p class="form-note">Semua kolom wajib diisi.</p>
        <UForm name="contact" method="post" data-netlify="true" netlify-honeypot="bot-field" :state="state" :disabled="!ready" :validate="validate" class="project-form contact-form" @submit="submitContact">
          <input type="hidden" name="form-name" value="contact">
          <input type="hidden" name="subject" :value="subject">
          <input type="hidden" name="bot-field" value="">
          <div class="form-grid">
            <UFormField name="name" label="Nama lengkap" required>
              <UInput id="contact-name" v-model="state.name" name="name" placeholder="Nama Anda" autocomplete="name" class="w-full" size="xl" :maxlength="100"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="phone" label="Nomor telepon" required>
              <UInput id="contact-phone" v-model="state.phone" name="phone" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" class="w-full" size="xl" :maxlength="25"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
          </div>
          <UFormField name="email" label="Alamat email" required>
            <UInput id="contact-email" v-model="state.email" name="email" type="email" placeholder="nama@email.com" autocomplete="email" class="w-full" size="xl" :maxlength="254"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <UFormField name="message" label="Pesan" required>
            <UTextarea id="contact-message" v-model="state.message" name="message" placeholder="Apa yang bisa kami bantu? Tuliskan pertanyaan atau kebutuhan Anda di sini." :rows="5" :maxlength="2000" class="w-full" size="xl"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <div class="form-submit-row"><UButton type="submit" :label="isSubmitting ? 'Mengirim…' : 'Kirim Pesan'" :loading="isSubmitting" :disabled="!ready || isSubmitting" size="xl" trailing-icon="i-lucide-send"/><span>Kami membalas pada jam kerja.</span></div>
          <p class="form-note">Dengan mengirim, Anda menyetujui <NuxtLink to="/kebijakan-privasi">Kebijakan Privasi</NuxtLink>.</p>
        </UForm>
        <p v-if="submitStatus === 'success'" class="form-feedback form-feedback-success" role="status">Terima kasih. Pesan Anda sudah terkirim dan tim kami akan segera menindaklanjuti.</p>
        <p v-else-if="submitStatus === 'error'" class="form-feedback form-feedback-error" role="alert">Pesan belum terkirim. Periksa koneksi Anda, lalu coba kembali beberapa saat lagi.</p>
      </div>
</template>
