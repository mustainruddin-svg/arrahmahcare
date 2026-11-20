# Ar-Rahmah Care — Platform Donasi & Transparansi Sosial

Platform resmi penghimpunan dan penyaluran kepedulian sosial di bawah naungan **Yayasan Ar-Rahmah Sulawesi**, Makassar. Dibangun khusus dengan pendekatan modern-minimalis premium, dominan putih dengan warna biru langit resmi dari logo (`#51C3FF` / `#0876AE`) dan aksen emas (`#F3AF01`), mobile-first, aksesibel, dan sepenuhnya berbasis basis data (*ledger-backed database*).

---

## 🛡️ Prinsip Keamanan & Batasan Operasional (Compliance Boundary)

Sesuai instruksi master `AR-RAHMAH-CARE-BUILD-SPEC.md`:
- **Tidak ada angka rekaan:** Seluruh metrik donasi terkumpul, penyaluran, saldo kas, dan penerima manfaat dihitung dinamis dari tabel transaksi basis data (`status = 'PAID'` dan `status = 'POSTED'`).
- **Mode Sandbox Default:** Gateway pembayaran beroperasi dalam mode simulator sandbox aman. **Pembayaran uang riil tidak diaktifkan** sampai izin kelembagaan resmi dan kredensial merchant perbankan diverifikasi pengurus.
- **Perizinan Zakat & Wakaf:** Fitur layanan transaksi zakat formal dan wakaf uang dinonaktifkan secara ketat via saklar fitur (*feature toggle*) di panel admin sampai izin LAZ / Nazhir resmi disahkan.
- **Identitas Resmi:** Menggunakan file logo asli pengguna yang disalin ke `public/brand/ar-rahmah-care.jpg`.

---

## 🚀 Fitur yang Telah Diimplementasikan

### 1. Halaman Publik (P0)
- **Beranda (`/`):** Hero banner, kartu metrik transparansi *real-time* dari DB, kategori fokus penyaluran, program unggulan, alur 3 langkah berdonasi, dokumentasi cerita dampak beretika, berita kegiatan, dan ajakan berbagi.
- **Katalog Program (`/program`):** Pencarian kampanye dan filter kategori (Pendidikan, Kemanusiaan, Sarana Ibadah, Pangan).
- **Detail Program (`/program/[slug]`):** Progres capaian dana riil, donatur terkonfirmasi, sasaran penerima manfaat, rincian alokasi dana, dan pembaruan penyaluran.
- **Checkout Donasi (`/donasi/[slug]`):** Pilihan nominal cepat, custom input minimal Rp 10.000, opsi donatur anonim (*Hamba Allah*), kuitansi email/WA, metode pembayaran QRIS & Transfer Bank BSI.
- **Status Transaksi & Simulator (`/donasi/status/[orderId]`):** Instruksi pembayaran, QRIS scanner preview, simulator tombol uji sandbox (*Simulasikan Lunas / Kedaluwarsa*), dan **Kuitansi Sah Digital** yang dapat dicetak/PDF.
- **Transparansi & Laporan (`/laporan`):** Neraca ringkasan dana terhimpun, dana disalurkan, saldo terikat, daftar dokumen laporan publikasi, dan tabel penyaluran posted.
- **Cerita Dampak (`/dampak`):** Dokumentasi penerima bantuan dengan persetujuan (*consent-verified*) tanpa eksploitasi kemiskinan.
- **Kabar & Artikel (`/berita` & `/berita/[slug]`):** Edukasi infaq sekolah dan liputan penyaluran santri.
- **Tentang Kami (`/tentang`):** Profil ekosistem SIT Ar-Rahmah Makassar (PAUD, SDIT, SMPIT, SMAIT) dan 3 pilar amanah.
- **Keterbukaan Legalitas (`/legalitas`):** Penjelasan transparan kedudukan hukum di bawah Yayasan Ar-Rahmah Sulawesi dan status perizinan.
- **Kontak & Layanan (`/kontak`):** Lokasi kantor sekretariat Makassar, email, WhatsApp, dan form kirim pesan.
- **Konfirmasi Donasi (`/konfirmasi-donasi`):** Formulir konfirmasi transfer bank manual.
- **Kebijakan Privasi (`/kebijakan-privasi`), Syarat Ketentuan (`/syarat-ketentuan`), & FAQ (`/faq`).

### 2. Panel Admin CMS (`/admin`)
- **Autentikasi Aman:** Login pengurus berbasis HTTP-Only Secure Cookie & JOSE JWT Token dengan proteksi Role-Based Access Control (RBAC).
- **Overview Dashboard (`/admin`):** KPI metrik riil dari DB, donasi pending, daftar pengajuan penyaluran butuh approval, dan jejak audit aktivitas terkini.
- **Manajemen Program (`/admin/program`):** Tambah program baru (`/admin/program/new`), atur status (`DRAFT`, `PUBLISHED`, `PAUSED`), target nominal, dan unggulan.
- **Transaksi Donasi (`/admin/donasi`):** Daftar seluruh transaksi, filter status (`PAID`, `PENDING`, `EXPIRED`, `CANCELLED`), verifikasi manual (*Mark as Paid*), dan ekspor CSV.
- **Data Donatur (`/admin/donatur`):** Daftar donatur dengan penyembunyian privasi (*data masking*) nomor HP dan email.
- **Penyaluran Dana (*Maker-Checker*) (`/admin/penyaluran`):** Form pengajuan belanja/penyaluran (`/admin/penyaluran/new`), approval dan pembukuan (*POSTED*) oleh approver/super admin, dan ekspor CSV.
- **Laporan Keuangan (`/admin/laporan`):** Publikasi dokumen laporan dan ekspor CSV.
- **Berita (`/admin/berita`) & Cerita Dampak (`/admin/dampak`):** Moderasi artikel dan cerita bertanda consent.
- **Pengaturan Lembaga (`/admin/pengaturan`):** Pengaturan identitas yayasan, rekening BSI terverifikasi, alamat sekretariat Makassar, klausul legal, dan saklar fitur (*Zakat, Wakaf, Qurban, Sandbox mode*).
- **Jejak Audit (`/admin/audit-log`):** Catatan log otomatis untuk setiap peristiwa pembayaran sah, pengesahan penyaluran, dan perubahan konfigurasi.

### 3. Mesin Pembayaran (*Payment Engine*)
- Menggunakan arsitektur adapter `PaymentProvider` (`mock` simulator & `midtrans` Snap).
- Webhook aman dengan pemeriksaan tanda tangan (*signature verification*) dan **idempotency ketat** melalui tabel `PaymentEvent` untuk mencegah duplikasi donasi.

---

## 💻 Cara Menjalankan di Komputer Lokal

### 1. Masuk ke Direktori Proyek
```bash
cd /Users/cikgudesain/.gemini/antigravity/scratch/ar-rahmah-care
```

### 2. Konfigurasi Lingkungan (.env)
File `.env` telah disiapkan secara otomatis dengan konfigurasi SQLite lokal:
```ini
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_SECRET="ar-rahmah-care-dev-secret-super-safe-key-change-in-prod-2026"
PAYMENT_PROVIDER="mock"
PAYMENT_ENV="sandbox"
ENABLE_LIVE_PAYMENTS="false"
```

### 3. Migrasi & Seed Database
```bash
npm run db:push
npm run db:seed
```

### 4. Jalankan Server Development
```bash
npm run dev
```
Akses aplikasi melalui peramban web di: **`http://localhost:3000`**

---

## 🔑 Akun Login Pengurus (Demo Seeding)

Pada halaman login pengurus di `/admin/login`, telah disediakan tombol akses cepat satu klik (*Quick Demo Fill*):

| Peran (Role) | Email | Password | Hak Akses |
|---|---|---|---|
| **Super Admin** | `superadmin@arrahmahsulawesi.org` | `AdminCare2026!` | Pengaturan penuh, pengguna, program, donasi, audit log |
| **Bendahara / Finance** | `keuangan@arrahmahsulawesi.org` | `FinanceCare2026!` | Verifikasi donasi, pengajuan penyaluran, laporan keuangan |
| **Admin Program** | `program@arrahmahsulawesi.org` | `ProgramCare2026!` | CRUD program, pembaruan kabar, artikel, cerita dampak |

---

## 🧪 Pengujian & Pemeriksaan Kualitas Kode

Seluruh pengujian otomatis, pemeriksaan tipe TypeScript, dan linting telah dijalankan dan lulus 100%:

```bash
# 1. Jalankan Unit & Integration Test Suite (Vitest)
npm test

# 2. Jalankan Pemeriksaan Tipe TypeScript
npm run typecheck

# 3. Jalankan Linter Kode
npm run lint

# 4. Bangun Hasil Produksi (Production Build)
npm run build
```

---

## 📋 Status Kesiapan Produksi (*Production Readiness Checklist*)

| Aspek | Status | Tindakan untuk Go-Live |
|---|---|---|
| **Logo & Identitas Visual** | ✅ Resmi | Menggunakan logo asli `public/brand/ar-rahmah-care.jpg`. |
| **Basis Data & Angka Donasi** | ✅ Riil dari DB | Tidak ada angka hardcode; seluruhnya dari query ledger. |
| **Alur Donasi & Kuitansi** | 🧪 Sandbox Simulator | Berjalan end-to-end; simulator aktif di `/donasi/status/[orderId]`. |
| **Kredensial Midtrans** | ⏳ Menunggu Pengurus | Masukkan `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` resmi di `.env`. |
| **Verifikasi Rekening Bank** | ⏳ Menunggu Pengurus | Lengkapi nomor rekening BSI definitif di `/admin/pengaturan`. |
| **Izin LAZ / Wakaf Formal** | 🔒 Dinonaktifkan | Fitur zakat & wakaf dikunci sampai dokumen perizinan resmi diverifikasi. |
