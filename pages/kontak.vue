<script setup lang="ts">
const config = useRuntimeConfig()
const { data: company } = await useCompany()
const state = reactive({ name: '', phone: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const subject = computed(() => 'Pesan kontak website — ' + (state.name.trim() || 'baru'))
const email = computed(() => String(config.public.contactEmail || company.value?.contact?.email || 'halo@alphatunasmandiri.example'))
const phone = computed(() => String(config.public.whatsapp || company.value?.contact?.phone || '+62 812-0000-0001'))
const mapQuery = computed(() => company.value?.contact?.mapQuery || '-6.9210,106.9270')
const mapUrl = computed(() => 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery.value) + '&z=15&output=embed&hl=id')
const directions = computed(() => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapQuery.value))
const validate = (value: typeof state) => {
  const errors = []
  if (value.name.trim().length < 2) errors.push({ name: 'name', message: 'Masukkan nama minimal 2 karakter.' })
  if (!/^[+\d\s().-]+$/.test(value.phone) || !/^\d{8,15}$/.test(value.phone.replace(/\D/g, ''))) errors.push({ name: 'phone', message: 'Masukkan nomor telepon yang valid (8–15 digit).' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.push({ name: 'email', message: 'Masukkan alamat email yang valid.' })
  if (value.message.trim().length < 10) errors.push({ name: 'message', message: 'Tulis pesan minimal 10 karakter.' })
  return errors
}
watch(state, () => { if (submitStatus.value !== 'idle') submitStatus.value = 'idle' })
async function submitContact() {
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
usePageSeo('Kontak & Kantor Sukabumi', 'Hubungi PT Alpha Tunas Mandiri di Sukabumi melalui email, telepon, atau WhatsApp untuk kebutuhan konstruksi Anda.')
</script>

<template>
  <div>
    <PageIntro title="Mari mulai percakapan." description="Diskusikan kebutuhan proyek Anda bersama tim kami." eyebrow="Kontak"/>
    <section class="shell section contact-layout contact-refresh">
      <aside class="contact-aside">
        <div class="contact-photo">
          <img src="https://images.unsplash.com/photo-1743819336189-71deffe7835b?auto=format&fit=crop&fm=jpg&q=80&w=640" srcset="https://images.unsplash.com/photo-1743819336189-71deffe7835b?auto=format&fit=crop&fm=jpg&q=80&w=480 480w, https://images.unsplash.com/photo-1743819336189-71deffe7835b?auto=format&fit=crop&fm=jpg&q=80&w=640 640w, https://images.unsplash.com/photo-1743819336189-71deffe7835b?auto=format&fit=crop&fm=jpg&q=80&w=960 960w" sizes="(max-width: 767px) calc(100vw - 2.5rem), 34vw" alt="Pekerja di area konstruksi gedung bertingkat" width="1200" height="900" fetchpriority="high" decoding="async">
          <span>Foto ilustrasi konstruksi</span>
        </div>
        <div class="contact-aside-body">
          <p class="eyebrow">HUBUNGI KAMI</p>
          <h2>Mulai dari satu pesan.</h2>
          <div class="contact-channels">
            <a :href="'tel:' + phone.replace(/[^+\d]/g, '')" class="contact-channel"><UIcon name="i-lucide-phone"/><span><small>Telepon & WhatsApp</small><strong>{{ phone }}</strong></span></a>
            <a :href="'mailto:' + email" class="contact-channel"><UIcon name="i-lucide-mail"/><span><small>Email perusahaan</small><strong>{{ email }}</strong></span></a>
          </div>
          <a href="#lokasi-kantor" class="text-link">Lihat kantor Sukabumi <UIcon name="i-lucide-arrow-down"/></a>
          <p class="contact-hours"><UIcon name="i-lucide-clock-3"/> {{ company?.hours }}</p>
        </div>
      </aside>

      <div class="contact-panel">
        <div class="contact-form-heading"><span class="form-symbol"><UIcon name="i-lucide-send"/></span><span class="eyebrow">PESAN UNTUK KAMI</span></div>
        <h2>Kirim pesan Anda.</h2>
        <p class="form-note">Semua kolom wajib diisi.</p>
        <UForm name="contact" method="post" data-netlify="true" netlify-honeypot="bot-field" :state="state" :validate="validate" class="project-form contact-form" @submit="submitContact">
          <input type="hidden" name="form-name" value="contact">
          <input type="hidden" name="subject" :value="subject">
          <input type="hidden" name="bot-field" value="">
          <div class="form-grid">
            <UFormField name="name" label="Nama lengkap" required>
              <UInput v-model="state.name" name="name" placeholder="Nama Anda" autocomplete="name" class="w-full" size="xl" :maxlength="100"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="phone" label="Nomor telepon" required>
              <UInput v-model="state.phone" name="phone" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" class="w-full" size="xl" :maxlength="25"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
          </div>
          <UFormField name="email" label="Alamat email" required>
            <UInput v-model="state.email" name="email" type="email" placeholder="nama@email.com" autocomplete="email" class="w-full" size="xl" :maxlength="254"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <UFormField name="message" label="Pesan" required>
            <UTextarea v-model="state.message" name="message" placeholder="Apa yang bisa kami bantu? Tuliskan pertanyaan atau kebutuhan Anda di sini." :rows="5" :maxlength="2000" class="w-full" size="xl"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <div class="form-submit-row"><UButton type="submit" :label="isSubmitting ? 'Mengirim…' : 'Kirim Pesan'" :loading="isSubmitting" :disabled="isSubmitting" size="xl" trailing-icon="i-lucide-send"/><span>Kami membalas pada jam kerja.</span></div>
          <p class="form-note">Dengan mengirim, Anda menyetujui <NuxtLink to="/kebijakan-privasi">Kebijakan Privasi</NuxtLink>.</p>
        </UForm>
        <p v-if="submitStatus === 'success'" class="form-feedback form-feedback-success" role="status">Terima kasih. Pesan Anda sudah terkirim dan tim kami akan segera menindaklanjuti.</p>
        <p v-else-if="submitStatus === 'error'" class="form-feedback form-feedback-error" role="alert">Pesan belum terkirim. Periksa koneksi Anda, lalu coba kembali beberapa saat lagi.</p>
      </div>
    </section>

    <section id="lokasi-kantor" class="office-section surface">
      <div class="shell">
        <div class="section-heading"><div><p class="eyebrow">KANTOR SUKABUMI</p><h2>Temukan kami.</h2></div><p>{{ company?.hours }}</p></div>
        <div class="office-map-grid">
          <div class="office-card">
            <span class="office-card-icon"><UIcon name="i-lucide-building-2"/></span>
            <p class="eyebrow">PT ALPHA TUNAS MANDIRI</p><h3>Kantor Sukabumi</h3>
            <p>{{ company?.contact?.address }}</p>
            <div class="office-card-hours"><UIcon name="i-lucide-clock-3"/><span>{{ company?.hours }}</span></div>
            <UButton :to="directions" target="_blank" rel="noopener noreferrer" label="Petunjuk Arah" trailing-icon="i-lucide-arrow-up-right" size="lg"/>
          </div>
          <iframe :src="mapUrl" title="Peta lokasi kantor dummy di Sukabumi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen class="office-map"/>
        </div>
      </div>
    </section>
    <WhatsAppContact/>
  </div>
</template>
