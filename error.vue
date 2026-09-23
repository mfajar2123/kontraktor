<script setup lang="ts">
import { id } from '@nuxt/ui/locale'
defineProps<{ error: { statusCode: number } }>()
useHead({ htmlAttrs: { lang: 'id' }, title: 'Halaman tidak ditemukan | PT Alpha Tunas Mandiri' })
</script><template><UApp :locale="id"><div class="error-page shell"><BrandLogo/><p class="eyebrow">{{ error.statusCode }}</p><h1>{{ error.statusCode === 404 ? 'Halaman tidak ditemukan.' : 'Halaman belum dapat dimuat.' }}</h1><p>Silakan kembali ke beranda untuk melanjutkan penelusuran.</p><UButton label="Kembali ke Beranda" @click="clearError({ redirect: '/' })"/></div></UApp></template>
