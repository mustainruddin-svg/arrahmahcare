import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Perlindungan Data Pribadi</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            Kebijakan Privasi Donatur
          </h1>
          <p className="text-xs text-text-muted">
            Berlaku per November 2026 · Yayasan Ar-Rahmah Sulawesi
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              1. Pengumpulan Informasi
            </h2>
            <p>
              Ar-Rahmah Care hanya mengumpulkan data yang diperlukan untuk pemrosesan transaksi donasi dan penerbitan kuitansi sah, meliputi: nama donatur, alamat email, nomor telepon/WhatsApp, dan pesan doa donatur.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              2. Pilihan Anonimitas (Hamba Allah)
            </h2>
            <p>
              Kami sangat menghargai niat keikhlasan Anda. Anda dapat memilih opsi &ldquo;Hamba Allah&rdquo; pada formulir donasi. Nama Anda tidak akan pernah ditampilkan pada publikasi publik maupun daftar donatur di website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              3. Penggunaan & Keamanan Data
            </h2>
            <p>
              Data donatur disimpan dalam sistem terenkripsi dan tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga di luar kebutuhan verifikasi transaksi perbankan dan pelaporan resmi yayasan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              4. Perlindungan Hak Penerima Manfaat
            </h2>
            <p>
              Dokumentasi penerima bantuan santri yatim dan dhuafa ditampilkan secara beretika dengan persetujuan orang tua/wali serta tidak mengekspos alamat tempat tinggal pribadi atau identitas sensitif mereka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
