export const metadata = {
  title: "Syarat & Ketentuan Layanan",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            Syarat & Ketentuan Donasi
          </h1>
          <p className="text-xs text-text-muted">
            Ar-Rahmah Care · Unit Amal Yayasan Ar-Rahmah Sulawesi
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              1. Akad Donasi & Keikhlasan
            </h2>
            <p>
              Setiap donasi yang disalurkan melalui platform Ar-Rahmah Care berakad hibah / sedekah sukarela untuk tujuan sosial kemanusiaan, beasiswa pendidikan, dan dakwah. Donatur menyatakan bahwa dana yang disumbangkan bersumber dari perolehan yang halal dan sah secara hukum.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              2. Batas Minimum & Sesi Transaksi
            </h2>
            <p>
              Batas donasi minimum adalah Rp 10.000 (Sepuluh Ribu Rupiah). Setiap sesi pembayaran berlaku selama 24 jam. Jika melewati batas waktu tersebut, sistem akan mengubah status transaksi menjadi kedaluwarsa.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              3. Kebijakan Pengembalian (Refund)
            </h2>
            <p>
              Donasi yang telah berstatus lunas (PAID) pada prinsipnya tidak dapat ditarik kembali karena telah dialokasikan ke pos penyaluran program terkait, kecuali terjadi kekeliruan nominal transfer nyata yang dibuktikan dengan bukti sah perbankan dan dilaporkan dalam waktu 1x24 jam kepada bendahara yayasan.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-bold text-text-primary">
              4. Mode Operasi & Verifikasi
            </h2>
            <p>
              Platform ini saat ini beroperasi dengan simulasi sandbox terproteksi sebelum peluncuran resmi gateway perbankan live yang disahkan oleh pengurus yayasan.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
