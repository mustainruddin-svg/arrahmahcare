import { ShieldCheck, FileCheck, AlertCircle, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Keterbukaan Legalitas & Tata Kelola",
};

export default function LegalDisclosurePage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kepatuhan Regulasi & Akuntabilitas</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Keterbukaan Status Legalitas & Perizinan
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto">
            Sebagai bentuk komitmen terhadap tata kelola yang amanah, Ar-Rahmah Care menyajikan kedudukan hukum, status perizinan, dan kepatuhan regulasi secara transparan dan terbuka kepada publik.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-text-primary">
                Kedudukan Hukum Kelembagaan
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                Ar-Rahmah Care beroperasi sebagai unit pengelola dana kepedulian sosial dan filantropi pendidikan yang bernaung di bawah badan hukum resmi <strong>Yayasan Ar-Rahmah Sulawesi</strong> (Makassar).
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-surface-subtle border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Penggalangan Donasi Sosial & Kemanusiaan</span>
              </div>
              <p className="text-text-muted">
                Program yang saat ini aktif dibuka untuk publik adalah program infaq, sedekah sukarela, beasiswa santri, bantuan pangan, dan tanggap darurat bencana yang dikelola untuk kebutuhan komunitas sekolah dan masyarakat sekitar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Status Layanan Zakat & Wakaf Formal</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Sesuai dengan ketentuan perundang-undangan di Republik Indonesia (UU No. 23 Tahun 2011 tentang Pengelolaan Zakat dan UU No. 41 Tahun 2004 tentang Wakaf), penerimaan zakat formal dan wakaf uang memerlukan legalitas izin operasional sebagai Lembaga Amil Zakat (LAZ) atau Nazhir Wakaf resmi dari kementerian/badan terkait.
                <br /><br />
                Oleh karena itu, modul layanan transaksi zakat dan wakaf pada sistem ini <strong>sementara dinonaktifkan secara ketat</strong> hingga seluruh berkas kelayakan, rekomendasi instansi berwenang, dan pengesahan dewan pengawas syariah resmi terpenuhi dan disahkan oleh pengurus yayasan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-text-primary">
                <FileCheck className="w-4 h-4 text-brand-sky-dark" />
                <span>Pemisahan Rekening & Audit Internal</span>
              </div>
              <p className="text-text-muted">
                Penerimaan donasi dikelola melalui rekening bank khusus terpisah dari anggaran operasional yayasan dan unit sekolah. Pembukuan internal dilaporkan secara berkala setiap semester melalui laporan publikasi yang dapat diakses oleh donatur di halaman transparansi website ini.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="text-center text-xs text-text-muted space-y-2">
          <p>
            Dokumen legal yayasan, akta notaris, dan surat keterangan terdaftar dapat diverifikasi langsung melalui sekretariat kantor yayasan di Makassar.
          </p>
          <p className="text-slate-400">
            Terakhir diperbarui: Periode Berjalan 2026 · Yayasan Ar-Rahmah Sulawesi
          </p>
        </div>
      </div>
    </div>
  );
}
