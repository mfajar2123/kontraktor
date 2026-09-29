<script setup lang="ts">
const config = useRuntimeConfig()
const { data: company } = await useCompany()
const email = computed(() => String(config.public.contactEmail || company.value?.contact?.email || 'halo@alphatunasmandiri.example'))
const phone = computed(() => String(config.public.whatsapp || company.value?.contact?.phone || '+62 812-0000-0001'))
const mapQuery = computed(() => company.value?.contact?.mapQuery || '-6.9210,106.9270')
const mapUrl = computed(() => 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery.value) + '&z=15&output=embed&hl=id')
const directions = computed(() => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapQuery.value))
usePageSeo('Kontak & Kantor Sukabumi', 'Hubungi PT Alpha Tunas Mandiri di Sukabumi melalui email, telepon, atau WhatsApp untuk kebutuhan konstruksi Anda.')
</script>

<template>
  <div>
    <PageIntro title="Mari mulai percakapan." description="Diskusikan kebutuhan proyek Anda bersama tim kami." eyebrow="Kontak"/>
    <section class="shell section contact-layout contact-refresh">
      <aside class="contact-aside">
        <div class="contact-photo">
          <NuxtImg src="/unsplash/photo-1743819336189-71deffe7835b" alt="Pekerja di area konstruksi gedung bertingkat" width="1200" height="900" fetchpriority="high" decoding="async" sizes="sm:100vw md:34vw xl:440px" format="webp" fit="inside" />
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

      <LazyContactForm hydrate-on-visible />
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
          <OfficeMap :src="mapUrl" />
        </div>
      </div>
    </section>
    <WhatsAppContact/>
  </div>
</template>
