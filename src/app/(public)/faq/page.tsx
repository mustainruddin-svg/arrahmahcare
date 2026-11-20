import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tanya Jawab (FAQ)",
};

const FAQS = [
  {
    q: "Apa itu Ar-Rahmah Care?",
    a: "Ar-Rahmah Care adalah unit filantropi sosial dan kepedulian yang bernaung di bawah Yayasan Ar-Rahmah Sulawesi di Makassar. Kami mengelola program beasiswa santri yatim dhuafa, sarana ibadah sekolah, serta bantuan pangan dan bencana.",
  },
  {
    q: "Bagaimana cara menyalurkan donasi?",
    a: "Anda cukup memilih program di menu Program, menentukan nominal donasi, memilih metode pembayaran (QRIS atau Transfer Bank), dan menyelesaikan pembayaran. Sistem akan menerbitkan kuitansi digital sah secara otomatis saat status lunas.",
  },
  {
    q: "Apakah saya bisa berdonasi tanpa menampilkan nama saya?",
    a: "Tentu. Anda dapat mencentang opsi 'Sembunyikan nama (Hamba Allah)' saat mengisi formulir. Nama Anda tidak akan dicantumkan di riwayat publik.",
  },
  {
    q: "Bagaimana saya tahu donasi saya telah disalurkan?",
    a: "Setiap penyaluran didokumentasikan dan dilaporkan secara berkala melalui menu Laporan dan Berita pada website ini. Anda dapat memantau realisasi dana secara terbuka.",
  },
  {
    q: "Apakah Ar-Rahmah Care menerima pembayaran zakat fitrah atau zakat maal?",
    a: "Saat ini modul layanan penerimaan zakat formal dinonaktifkan sementara sambil menunggu kelengkapan verifikasi kelembagaan LAZ resmi sesuai regulasi perundang-undangan di Indonesia.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Bantuan Donatur</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto">
            Temukan jawaban seputar tata kelola, cara berdonasi, dan transparansi penyaluran Ar-Rahmah Care.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-border shadow-xs space-y-2">
              <h2 className="font-bold text-base text-text-primary">
                {faq.q}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-surface-subtle p-8 rounded-3xl border border-border text-center space-y-3">
          <h2 className="font-serif font-bold text-lg text-text-primary">
            Masih memiliki pertanyaan lain?
          </h2>
          <p className="text-xs text-text-muted">
            Tim sekretariat kami siap membantu Anda setiap jam kerja operasional.
          </p>
          <div className="pt-2">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-full bg-brand-sky-dark text-white font-semibold text-xs shadow-sm hover:bg-brand-sky-deep transition-all"
            >
              <span>Hubungi Layanan Donatur</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
