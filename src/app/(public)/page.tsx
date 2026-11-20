import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { getGlobalImpactStats, getProgramStats } from "@/server/donations/stats";
import { formatRupiah, formatNumber, formatDateWita } from "@/lib/format";
import { ProgramCard } from "@/components/program/ProgramCard";
import {
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  FileText,
} from "lucide-react";

export const revalidate = 0; // Ensure fresh metrics from database on every visit

export default async function HomePage() {
  const [globalStats, featuredProgramsRaw, latestArticles, latestImpactStories, latestReports, categories] =
    await Promise.all([
      getGlobalImpactStats(),
      db.program.findMany({
        where: { status: "PUBLISHED" },
        include: { category: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: 6,
      }),
      db.article.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      db.impactStory.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 2,
      }),
      db.report.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { periodEnd: "desc" },
        take: 2,
      }),
      db.category.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);

  // Aggregate real stats per featured program
  const featuredPrograms = await Promise.all(
    featuredProgramsRaw.map(async (p) => {
      const stats = await getProgramStats(p.id, p.targetAmount);
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        coverImage: p.coverImage,
        targetAmount: p.targetAmount,
        collectedAmount: stats.collectedAmount,
        progressPercent: stats.progressPercent,
        categoryName: p.category.name,
        locationLabel: p.locationLabel,
        isFeatured: p.isFeatured,
      };
    })
  );

  return (
    <div className="space-y-20 pb-20">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-brand-sky-soft/60 via-surface-subtle to-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-brand-sky/40 shadow-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-sky-dark">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Unit Kepedulian Sosial SIT Ar-Rahmah Makassar</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.18]">
                Kebaikan Kecil, <br />
                <span className="text-brand-sky-dark italic">Dampak yang Berarti</span> Bagi Sesama.
              </h1>

              <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Ar-Rahmah Care hadir menjembatani kepedulian Anda untuk anak-anak yatim, dhuafa, sarana belajar Al-Quran, dan tanggap bencana. Dikelola dengan amanah dan transparan.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/program"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-brand-sky-dark hover:bg-brand-sky-deep shadow-soft hover:shadow-float px-7 py-3.5 rounded-full transition-all transform hover:-translate-y-0.5"
                >
                  <HeartHandshake className="w-4 h-4 text-brand-gold" />
                  <span>Pilih Program Donasi</span>
                </Link>
                <Link
                  href="/laporan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-text-primary bg-white hover:bg-slate-50 border border-slate-200 shadow-xs px-6 py-3.5 rounded-full transition-all"
                >
                  <FileText className="w-4 h-4 text-brand-sky" />
                  <span>Lihat Laporan Transparansi</span>
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pembukuan Terverifikasi</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-sky-dark" />
                  <span>Yayasan Ar-Rahmah Sulawesi</span>
                </div>
              </div>
            </div>

            {/* Right Card Column: Real-time Live Stats Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-border shadow-float p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Dashboard Metrik Nyata
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-sky-dark bg-brand-sky-soft px-2.5 py-0.5 rounded-full">
                    Database Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-subtle p-4 rounded-2xl border border-border/80">
                    <span className="text-xs text-text-muted block mb-1">Total Terkumpul</span>
                    <span className="text-lg sm:text-xl font-bold font-serif text-brand-sky-dark block">
                      {formatRupiah(globalStats.totalCollected)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">Donasi Sah Lunas</span>
                  </div>
                  <div className="bg-surface-subtle p-4 rounded-2xl border border-border/80">
                    <span className="text-xs text-text-muted block mb-1">Telah Disalurkan</span>
                    <span className="text-lg sm:text-xl font-bold font-serif text-text-primary block">
                      {formatRupiah(globalStats.totalDisbursed)}
                    </span>
                    <span className="text-[10px] text-brand-sky font-medium">Realisasi Program</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">Penerima Manfaat Terlayani:</span>
                    <span className="font-bold text-text-primary">
                      {formatNumber(globalStats.totalBeneficiaries)} Jiwa / Keluarga
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">Program Aktif Berjalan:</span>
                    <span className="font-bold text-brand-sky-dark">
                      {globalStats.activeProgramsCount} Program
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">Saldo Belum Disalurkan:</span>
                    <span className="font-bold text-amber-700">
                      {formatRupiah(globalStats.remainingBalance)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/laporan"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-brand-sky-dark bg-brand-sky-soft hover:bg-brand-sky-soft/80 transition-colors"
                  >
                    <span>Pelajari Rincian Alokasi Dana</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KATEGORI PROGRAM ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider">
            Fokus Penyaluran
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
            Kategori Program Kebaikan
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Pilih bidang penyaluran yang ingin Anda dukung sesuai dengan kepedulian Anda.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/program?kategori=${cat.slug}`}
              className="bg-white p-5 rounded-2xl border border-border/80 shadow-xs hover:shadow-card hover:border-brand-sky transition-all text-center group"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-sky-soft flex items-center justify-center text-brand-sky-dark mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-text-primary group-hover:text-brand-sky-dark transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-text-muted line-clamp-2">
                {cat.description || "Program terverifikasi"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. PROGRAM UNGGULAN (DARI DATABASE) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Unggulan</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
              Pilih Kebaikan yang Ingin Anda Hadirkan
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl">
              Seluruh angka capaian dihitung langsung dari donasi terkonfirmasi di sistem pembukuan.
            </p>
          </div>
          <Link
            href="/program"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-sky-dark hover:underline"
          >
            <span>Lihat Semua Program ({globalStats.activeProgramsCount})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPrograms.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </section>

      {/* ── 4. CARA BERDONASI ── */}
      <section className="bg-surface-subtle py-16 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider">
              Mudah & Aman
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
              3 Langkah Mudah Berbagi
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Pengalaman berdonasi tanpa kendala teknis, langsung tersalurkan kepada penerima haknya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-sky-soft text-brand-sky-dark font-serif font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-text-primary">Pilih Program</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Tentukan program yang ingin Anda dukung — beasiswa yatim, pangan, bencana, atau sarana ibadah.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold-soft text-brand-gold-dark font-serif font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-text-primary">Masukkan Nominal & Bayar</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Gunakan QRIS instan atau transfer bank BSI yang terenkripsi dan diverifikasi otomatis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-700 font-serif font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-text-primary">Terima Kuitansi Sah</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Dapatkan bukti kuitansi digital resmi dan pantau pembaruan penyaluran secara berkala.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CERITA DAMPAK (DOKUMENTASI ASLI) ── */}
      {latestImpactStories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider">
                Bukti Nyata
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
                Cerita Dampak & Kehidupan yang Terbantu
              </h2>
            </div>
            <Link
              href="/dampak"
              className="text-xs sm:text-sm font-semibold text-brand-sky-dark hover:underline"
            >
              Lihat Semua Cerita &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestImpactStories.map((story) => (
              <div
                key={story.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-block bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {story.beneficiaryLabel}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-text-primary">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-text-muted">
                    {formatDateWita(story.createdAt)}
                  </span>
                  <Link
                    href="/dampak"
                    className="text-xs font-semibold text-brand-sky-dark hover:underline flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. BERITA & KEGIATAN TERKINI ── */}
      {latestArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider">
                Kabar Kebaikan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
                Berita & Kegiatan Ar-Rahmah Care
              </h2>
            </div>
            <Link
              href="/berita"
              className="text-xs sm:text-sm font-semibold text-brand-sky-dark hover:underline"
            >
              Lihat Semua Berita &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-border shadow-xs hover:shadow-card transition-all flex flex-col p-5 group"
              >
                <div className="flex items-center gap-2 text-[11px] text-text-muted mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDateWita(article.publishedAt || article.createdAt)}</span>
                </div>
                <Link href={`/berita/${article.slug}`}>
                  <h3 className="font-bold text-base text-text-primary group-hover:text-brand-sky-dark transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-xs text-text-muted line-clamp-3 mb-4 flex-1">
                  {article.excerpt}
                </p>
                <Link
                  href={`/berita/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sky-dark hover:underline pt-2 border-t border-slate-100"
                >
                  <span>Baca Artikel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. CTA AKHIR ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-sky-deep to-brand-sky-dark text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-soft relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Mulai Berbagi Hari Ini, <br />
              <span className="italic text-brand-gold-soft">Hadirkan Senyum untuk Mereka.</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Setiap donasi Anda dikelola dengan penuh amanah di bawah pengawasan Yayasan Ar-Rahmah Sulawesi.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/program"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-sky-deep font-bold text-sm shadow-md hover:bg-slate-50 transition-all"
              >
                🤲 Donasi Sekarang
              </Link>
              <Link
                href="/tentang"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/40 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                Tentang Lembaga Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
