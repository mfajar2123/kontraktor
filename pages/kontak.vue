<script setup lang="ts">
const config = useRuntimeConfig()
const { data: company } = await useCompany()
const state = reactive({ name: '', phone: '', email: '', message: '' })
const ready = ref(false)
const copyStatus = ref('')
const result = ref<HTMLElement>()
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
const messageBody = computed(() => ['Halo PT Alpha Tunas Mandiri,', '', state.message.trim(), '', 'Nama: ' + state.name.trim(), 'Telepon: ' + state.phone.trim(), 'Email: ' + state.email.trim()].join('\n'))
const mailLink = computed(() => 'mailto:' + email.value + '?subject=' + encodeURIComponent('Pesan dari ' + state.name.trim()) + '&body=' + encodeURIComponent(messageBody.value))
watch(state, () => { ready.value = false; copyStatus.value = '' })
async function prepareMessage() {
  ready.value = true
  await nextTick()
  result.value?.focus()
}
async function copyMessage() {
  try { await navigator.clipboard.writeText(messageBody.value); copyStatus.value = 'Pesan berhasil disalin.' }
  catch { copyStatus.value = 'Salin pesan secara manual dari kolom di atas.' }
}
usePageSeo('Kontak & Kantor Sukabumi', 'Hubungi PT Alpha Tunas Mandiri di Sukabumi melalui email, telepon, atau WhatsApp untuk kebutuhan konstruksi Anda.')
</script>

<template>
  <div>
    <PageIntro title="Mari mulai percakapan yang berarti." description="Untuk rencana baru, peluang kerja sama, atau sekadar bertanya. Tim kami siap mendengarkan Anda." eyebrow="Kontak"/>
    <section class="shell section contact-layout contact-refresh">
      <aside>
        <p class="eyebrow">TERHUBUNG DENGAN KAMI</p>
        <h2>Dari Sukabumi,<br>untuk rencana Anda.</h2>
        <p class="muted">Pilih cara yang paling nyaman untuk terhubung. Kami melayani pertanyaan dan konsultasi pada jam operasional kantor.</p>
        <div class="contact-info">
          <UIcon name="i-lucide-phone"/>
          <div><h3>Telepon & WhatsApp</h3><a :href="'tel:' + phone.replace(/[^+\d]/g, '')">{{ phone }}</a><p>Pilih admin melalui tombol WhatsApp di kanan bawah.</p></div>
        </div>
        <div class="contact-info">
          <UIcon name="i-lucide-mail"/>
          <div><h3>Email Perusahaan</h3><a :href="'mailto:' + email">{{ email }}</a><p>Informasi layanan dan peluang kerja sama.</p></div>
        </div>
        <div class="contact-info">
          <UIcon name="i-lucide-map-pin"/>
          <div><h3>Kantor Sukabumi</h3><p>{{ company?.contact?.address }}</p><a href="#lokasi-kantor" class="text-link">Lihat Lokasi Kantor <UIcon name="i-lucide-arrow-down"/></a></div>
        </div>
        <div class="office-hours"><UIcon name="i-lucide-clock-3"/><div><strong>Jam Operasional</strong><p>{{ company?.hours }}</p><small>Sabtu, Minggu & hari libur: tutup</small></div></div>
        <p class="dummy-note">Alamat, email, dan nomor telepon merupakan data dummy untuk pratinjau website.</p>
      </aside>

      <div class="contact-panel">
        <div class="contact-form-heading"><span class="form-symbol"><UIcon name="i-lucide-send"/></span><span class="eyebrow">PESAN UNTUK KAMI</span></div>
        <h2>Kami senang mendengar<br>dari Anda.</h2>
        <p class="form-note">Isi formulir berikut untuk memulai percakapan. Semua kolom wajib diisi.</p>
        <UForm :state="state" :validate="validate" class="project-form contact-form" @submit="prepareMessage">
          <div class="form-grid">
            <UFormField name="name" label="Nama lengkap" required>
              <UInput v-model="state.name" placeholder="Nama Anda" autocomplete="name" class="w-full" size="xl" :maxlength="100"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
            <UFormField name="phone" label="Nomor telepon" required>
              <UInput v-model="state.phone" type="tel" placeholder="08xx xxxx xxxx" autocomplete="tel" class="w-full" size="xl" :maxlength="25"/>
              <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
            </UFormField>
          </div>
          <UFormField name="email" label="Alamat email" required>
            <UInput v-model="state.email" type="email" placeholder="nama@email.com" autocomplete="email" class="w-full" size="xl" :maxlength="254"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <UFormField name="message" label="Pesan" required>
            <UTextarea v-model="state.message" placeholder="Apa yang bisa kami bantu? Tuliskan pertanyaan atau kebutuhan Anda di sini." :rows="5" :maxlength="2000" class="w-full" size="xl"/>
            <template #error="{ error }"><span class="field-error">{{ error || '\u00a0' }}</span></template>
          </UFormField>
          <div class="form-submit-row"><UButton type="submit" label="Siapkan Pesan" size="xl" trailing-icon="i-lucide-arrow-up-right"/><span>Langkah selanjutnya:<br>kirim melalui aplikasi email Anda.</span></div>
          <p class="form-note">Informasi Anda digunakan untuk menyiapkan pesan. Baca <NuxtLink to="/kebijakan-privasi">Kebijakan Privasi</NuxtLink>.</p>
        </UForm>
        <div v-if="ready" ref="result" tabindex="-1" class="summary-panel">
          <h3>Pesan siap diteruskan.</h3>
          <p>Website belum mengirim pesan. Buka aplikasi email untuk meninjau dan mengirimnya.</p>
          <pre>{{ messageBody }}</pre>
          <div class="actions"><UButton :to="mailLink" label="Buka Aplikasi Email" icon="i-lucide-mail"/><UButton label="Salin Pesan" variant="outline" color="neutral" icon="i-lucide-copy" @click="copyMessage"/></div>
          <p role="status">{{ copyStatus }}</p>
        </div>
      </div>
    </section>

    <section id="lokasi-kantor" class="office-section surface">
      <div class="shell">
        <div class="section-heading"><div><p class="eyebrow">TEMUKAN KAMI</p><h2>Singgah dan bicarakan<br>rencana Anda.</h2></div><p>Atur waktu kunjungan bersama tim kami<br>agar percakapan Anda lebih nyaman.</p></div>
        <div class="office-map-grid">
          <div class="office-card">
            <span class="office-card-icon"><UIcon name="i-lucide-building-2"/></span>
            <p class="eyebrow">KANTOR SUKABUMI</p><h3>PT Alpha Tunas Mandiri</h3>
            <p>{{ company?.contact?.address }}</p>
            <div class="office-card-hours"><UIcon name="i-lucide-clock-3"/><span>{{ company?.hours }}</span></div>
            <UButton :to="directions" target="_blank" rel="noopener noreferrer" label="Petunjuk Arah" trailing-icon="i-lucide-arrow-up-right" size="lg"/>
            <small>Titik peta merupakan lokasi ilustratif di pusat Kota Sukabumi, bukan lokasi kantor terverifikasi.</small>
          </div>
          <iframe :src="mapUrl" title="Peta lokasi kantor dummy di Sukabumi" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen class="office-map"/>
        </div>
      </div>
    </section>
    <WhatsAppContact/>
  </div>
</template>
