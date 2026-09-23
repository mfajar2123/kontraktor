<script setup lang="ts">
const { data: company } = await useCompany()
const config = useRuntimeConfig()
const open = ref(false)
const admins = computed(() => company.value?.contact.admins.map((admin, index) => ({
  ...admin,
  phone: index === 0 && config.public.whatsapp ? String(config.public.whatsapp).replace(/\D/g, '') : admin.phone
})) || [])
const message = 'Halo PT Alpha Tunas Mandiri, saya ingin mendapatkan informasi mengenai layanan konstruksi.'
</script>

<template>
  <div class="whatsapp-float">
    <UPopover v-model:open="open" :content="{ side: 'top', align: 'end', sideOffset: 14, collisionPadding: 16, 'aria-label': 'Pilih admin WhatsApp' }">
      <button type="button" class="whatsapp-trigger" aria-label="Hubungi melalui WhatsApp" :aria-expanded="open">
        <WhatsAppIcon/><span class="whatsapp-trigger-label">Hubungi Kami</span>
        <UIcon :name="open ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'" class="whatsapp-chevron"/>
      </button>
      <template #content>
        <div class="whatsapp-panel">
          <div class="whatsapp-panel-heading">
            <WhatsAppIcon/>
            <div><p>ADA YANG BISA KAMI BANTU?</p><h2>Mari mulai percakapan.</h2></div>
            <UButton aria-label="Tutup pilihan admin" icon="i-lucide-x" color="neutral" variant="ghost" @click="open = false"/>
          </div>
          <div class="whatsapp-panel-body">
            <p>Pilih tim yang sesuai dengan kebutuhan Anda.</p>
            <a v-for="(admin, index) in admins" :key="admin.name"
               :href="'https://wa.me/' + admin.phone + '?text=' + encodeURIComponent(message)"
               target="_blank" rel="noopener noreferrer" class="whatsapp-admin"
               :aria-label="'Hubungi ' + admin.name + ' melalui WhatsApp (tab baru)'" @click="open = false">
              <span class="admin-avatar">0{{ index + 1 }}</span>
              <span><strong>{{ admin.name }}</strong><small>{{ admin.role }}</small></span>
              <UIcon name="i-lucide-arrow-up-right"/>
            </a>
            <span class="whatsapp-hours"><UIcon name="i-lucide-clock-3"/> {{ company?.hours }}</span>
            <p class="dummy-note">Nomor admin merupakan data dummy untuk pratinjau.</p>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
