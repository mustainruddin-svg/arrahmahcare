import Link from "next/link";
import Image from "next/image";
import { Building2, ShieldCheck, HeartHandshake, BookOpen, GraduationCap, Users } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>Mengenal Ar-Rahmah Care</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
            Jembatan Kepercayaan, <br />
            <span className="text-brand-sky-dark italic">Menghubungkan Hati yang Peduli</span>
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Ar-Rahmah Care adalah unit filantropi sosial yang tumbuh dari rahim ekosistem pendidikan Islam terpadu di bawah naungan <strong>Yayasan Ar-Rahmah Sulawesi</strong> di Makassar.
          </p>
        </div>

        {/* Narrative & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-border shadow-float bg-white p-4 flex items-center justify-center">
              <Image
                src="/brand/ar-rahmah-care.jpg"
                alt="Logo Ar-Rahmah Care"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-contain p-6"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-text-primary">
              Lahir dari Komunitas Pendidikan Islam Terpadu
            </h2>
            <p>
              Selama lebih dari satu dekade, Yayasan Ar-Rahmah Sulawesi telah membina dan mendidik ribuan generasi penerus bangsa melalui empat jenjang pendidikan terpadu di Makassar:
            </p>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-surface-subtle p-3 rounded-xl border border-border flex items-center gap-2 text-xs font-bold text-text-primary">
                <GraduationCap className="w-4 h-4 text-brand-sky-dark" />
                <span>PAUD IT Ar-Rahmah</span>
              </div>
              <div className="bg-surface-subtle p-3 rounded-xl border border-border flex items-center gap-2 text-xs font-bold text-text-primary">
                <GraduationCap className="w-4 h-4 text-brand-sky-dark" />
                <span>SDIT Ar-Rahmah</span>
              </div>
              <div className="bg-surface-subtle p-3 rounded-xl border border-border flex items-center gap-2 text-xs font-bold text-text-primary">
                <GraduationCap className="w-4 h-4 text-brand-sky-dark" />
                <span>SMPIT Ar-Rahmah</span>
              </div>
              <div className="bg-surface-subtle p-3 rounded-xl border border-border flex items-center gap-2 text-xs font-bold text-text-primary">
                <GraduationCap className="w-4 h-4 text-brand-sky-dark" />
                <span>SMAIT Ar-Rahmah</span>
              </div>
            </div>
            <p>
              Berangkat dari kesadaran bahwa pendidikan adab dan empati harus diwujudkan secara nyata, Ar-Rahmah Care didirikan sebagai wadah resmi untuk menggalang, mengelola, dan menyalurkan kepedulian para wali murid, alumni, guru, dan masyarakat luas kepada santri yatim, dhuafa, serta saudara-saudara kita yang membutuhkan pertolongan.
            </p>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="bg-surface-subtle rounded-3xl border border-border p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider">
              Prinsip Kerja
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
              Tiga Pilar Nilai Utama
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-text-primary">Amanah & Syariah</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Seluruh pengelolaan dana dipisahkan secara tegas dari biaya operasional yayasan dan disalurkan sesuai akad donasi serta kaidah fiqih sosial Islam.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-gold-soft text-brand-gold-dark flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-text-primary">Transparan & Terukur</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Setiap penerimaan dan penyaluran dicatat dalam sistem buku besar digital yang dapat diakses melalui laporan berkala dan diaudit secara berjenjang.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-text-primary">Menjaga Martabat</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Menghargai kehormatan para penerima manfaat tanpa mengeksploitasi kesulitan mereka dalam materi publikasi dan dokumentasi.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-text-primary">
            Mari Bersama Membina Generasi dan Berbagi Kebaikan
          </h2>
          <div className="flex justify-center gap-3">
            <Link
              href="/program"
              className="py-3 px-6 rounded-full bg-brand-sky-dark text-white font-bold text-xs sm:text-sm shadow-soft hover:bg-brand-sky-deep transition-all"
            >
              Lihat Program Penyaluran &rarr;
            </Link>
            <Link
              href="/legalitas"
              className="py-3 px-6 rounded-full border border-border hover:bg-slate-50 text-text-primary font-semibold text-xs sm:text-sm transition-all"
            >
              Keterbukaan Legalitas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
