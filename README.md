# PT Alpha Tunas Mandiri

Website profil perusahaan konstruksi dalam bahasa Indonesia. Nuxt 4, Nuxt UI 4, Tailwind CSS 4, dan Nuxt Content 3. Palet biru tua, putih hangat, oranye bata, tanpa gradien.

## Menjalankan

Gunakan Node.js 22.19+ atau 24 LTS dan pnpm 10.

```sh
pnpm install
pnpm dev
```

Buka http://localhost:3000. Untuk produksi statis:

```sh
pnpm generate
node scripts/serve.mjs
```

Pratinjau statis: http://127.0.0.1:4173. Semua halaman detail yang ditautkan akan dirender saat generate. Nuxt Content memakai konektor SQLite native Node; database konten dibuat otomatis dari file.

## Halaman

- Beranda, Tentang Kami, Layanan & Jasa, Galeri, Kontak, Artikel.
- Empat detail layanan, enam detail proyek ilustratif, tiga detail artikel.
- FAQ, kebijakan privasi, dan tampilan kesalahan berbahasa Indonesia.
- Filter kategori galeri, pencarian dan filter artikel, salin tautan artikel.
- Formulir kontak empat kolom (nama, telepon, email, pesan), draf email dan salin pesan.
- Tombol WhatsApp mengambang di halaman kontak dengan pilihan Admin 1 dan Admin 2.
- Google Maps embed dengan titik dummy Sukabumi, alamat kantor, dan petunjuk arah.
- Bagian pencapaian dan mitra contoh di beranda.
- Navigasi seluler, fokus keyboard, tautan lewati konten, dan dukungan reduced motion.

## Konten dan rencana Decap CMS

Konten dibaca menggunakan queryCollection dan ditampilkan dengan ContentRenderer. Struktur koleksi ada di content.config.ts:

| Lokasi | Isi |
| --- | --- |
| content/perusahaan.json | Identitas, kontak, dua admin, koordinat peta, pencapaian, mitra, proses kerja, FAQ |
| content/pages/*.md | Pengantar beranda, profil, kebijakan privasi |
| content/layanan/*.md | Deskripsi dan rincian layanan |
| content/proyek/*.md | Proyek, kategori, lokasi, tahun, lingkup |
| content/artikel/*.md | Artikel, tanggal, kategori, waktu baca |

Setiap Markdown menggunakan frontmatter biasa dan body Markdown. Ini dapat dipetakan ke folder collections Decap, sedangkan perusahaan.json memakai file collection. Nama file menentukan URL; pertahankan slug saat mengedit. Field wajib mengikuti schema content.config.ts.

Decap CMS belum dipasang. Integrasi selanjutnya membutuhkan pilihan backend Git, autentikasi, branch publikasi, dan konfigurasi media. Simpan media milik perusahaan di public/images/uploads dan gunakan path /images/uploads/nama-file.jpg. Setelah perubahan konten di-commit melalui CMS, jalankan build ulang untuk memperbarui website statis.

Teks antarmuka, judul beberapa bagian beranda, navigasi, dan footer masih berada di komponen Vue. Jangan memasukkan kredensial CMS ke runtimeConfig.public.

## Kontak

Salin .env.example menjadi .env, lalu isi domain dan kontak resmi jika sudah tersedia:

- NUXT_PUBLIC_SITE_URL: origin produksi tanpa trailing slash.
- NUXT_PUBLIC_CONTACT_EMAIL: email resmi.
- NUXT_PUBLIC_WHATSAPP: nomor internasional tanpa tanda +.

Kontak awal terisi dari content/perusahaan.json dengan data dummy: alamat Sukabumi, email berdomain .example, serta dua nomor admin. NUXT_PUBLIC_CONTACT_EMAIL menimpa email; NUXT_PUBLIC_WHATSAPP menimpa telepon utama dan nomor Admin 1. Admin 2 diubah di file konten.

Formulir memvalidasi nama, telepon, email, dan pesan, lalu menampilkan tombol membuka draf email atau menyalin pesan. Tidak ada pengiriman atau penyimpanan di server, dan tidak ada klaim pesan berhasil terkirim. Pilihan admin WhatsApp membuka tab baru dengan salam pembuka tanpa meneruskan isian formulir. Titik peta adalah ilustrasi pusat Kota Sukabumi, bukan lokasi kantor terverifikasi.

## Aset dan data contoh

Foto menggunakan URL images.unsplash.com, dimuat secara eksternal; ketersediaannya bergantung pada penyedia. Daftar URL ada di frontmatter konten serta komponen HeroSection dan halaman beranda/profil. Ganti dengan foto berizin milik perusahaan sebelum publikasi resmi.

Proyek, lokasi, tahun, cakupan layanan, jam operasional, profil, dan artikel merupakan konten rancangan yang perlu persetujuan perusahaan. Angka pencapaian, identitas mitra, alamat, nomor telepon, dan email merupakan data dummy berlabel pada antarmuka. Tidak ada klaim sertifikasi yang telah diverifikasi. Ganti semua data dummy sebelum publikasi resmi.

## Pengujian

```sh
pnpm generate
pnpm test:e2e
```

Playwright memakai Google Chrome yang terpasang dan menguji desktop serta seluler. Cakupan: seluruh halaman, metadata, overflow, filter, pencarian, validasi kontak, clipboard, navigasi, FAQ, reduced motion, seluruh foto beranda, panel dua admin WhatsApp, tautan peta, dan bagian pencapaian. Tangkapan layar disimpan di artifacts/.

## Deploy

Docker menggunakan Node 24 untuk generate dan Nginx untuk menyajikan .output/public. Build langsung di Node juga tersedia melalui pnpm build.

Workflow GitHub Pages tetap tersedia. Domain produksi diambil dari repository variable NUXT_PUBLIC_SITE_URL; isi setelah domain perusahaan ditetapkan. Tidak ada deployment yang dilakukan sebagai bagian implementasi lokal.
