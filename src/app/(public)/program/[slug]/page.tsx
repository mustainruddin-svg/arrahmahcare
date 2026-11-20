import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getProgramStats } from "@/server/donations/stats";
import { formatRupiah, formatDateWita, maskDonorName } from "@/lib/format";
import { ProgramProgress } from "@/components/program/ProgramProgress";
import {
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Tag,
  AlertCircle,
} from "lucide-react";

export const revalidate = 0;

interface ProgramDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailProps) {
  const { slug } = await params;

  const program = await db.program.findUnique({
    where: { slug },
    include: {
      category: true,
      updates: {
        orderBy: { publishedAt: "desc" },
      },
      disbursements: {
        where: { status: "POSTED" },
        orderBy: { postedAt: "desc" },
      },
      donations: {
        where: { status: "PAID" },
        orderBy: { paidAt: "desc" },
        take: 10,
      },
    },
  });

  if (!program) {
    notFound();
  }

  const stats = await getProgramStats(program.id, program.targetAmount);

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/program"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-brand-sky-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Program</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image, Info, Body, Updates, Donor list */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Meta Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-sky-soft text-brand-sky-dark text-xs font-semibold px-3 py-1 rounded-full">
                  {program.category.name}
                </span>
                {program.locationLabel && (
                  <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{program.locationLabel}</span>
                  </span>
                )}
                {program.status === "PAUSED" && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Donasi Dijeda Sementara
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
                {program.title}
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                {program.summary}
              </p>
            </div>

            {/* Media Image */}
            <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-border bg-slate-50 flex items-center justify-center shadow-soft">
              {program.coverImage ? (
                <Image
                  src={program.coverImage}
                  alt={program.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-contain p-6"
                  priority
                />
              ) : (
                <div className="text-6xl text-brand-sky">🤲</div>
              )}
            </div>

            {/* Mobile-Only Progress Card */}
            <div className="lg:hidden bg-white rounded-2xl border border-border shadow-soft p-5 space-y-4">
              <ProgramProgress percentage={stats.progressPercent} />
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="text-text-muted block">Terkumpul</span>
                  <span className="text-lg font-bold text-brand-sky-dark font-serif">
                    {formatRupiah(stats.collectedAmount)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted block">Target</span>
                  <span className="font-semibold text-text-primary">
                    {program.targetAmount > 0 ? formatRupiah(program.targetAmount) : "Kebutuhan Terbuka"}
                  </span>
                </div>
              </div>
              <Link
                href={`/donasi/${program.slug}`}
                className="w-full py-3.5 rounded-xl bg-brand-sky-dark text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold" />
                <span>Donasi Sekarang</span>
              </Link>
            </div>

            {/* Program Description */}
            <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-xl font-bold text-text-primary pb-3 border-b border-slate-100">
                Deskripsi & Urgensi Program
              </h2>
              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {program.body}
              </div>

              {/* Penerima Manfaat & Penggunaan Dana */}
              {(program.beneficiaryDescription || program.usageOfFunds) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {program.beneficiaryDescription && (
                    <div className="bg-surface-subtle p-4 rounded-2xl border border-border">
                      <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider block mb-1">
                        Penerima Manfaat
                      </span>
                      <p className="text-xs text-text-primary leading-relaxed">
                        {program.beneficiaryDescription}
                      </p>
                    </div>
                  )}
                  {program.usageOfFunds && (
                    <div className="bg-surface-subtle p-4 rounded-2xl border border-border">
                      <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider block mb-1">
                        Alokasi Dana
                      </span>
                      <p className="text-xs text-text-primary leading-relaxed">
                        {program.usageOfFunds}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Program Updates */}
            {program.updates.length > 0 && (
              <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
                <h2 className="font-serif text-xl font-bold text-text-primary pb-3 border-b border-slate-100">
                  Kabar Terbaru & Penyaluran
                </h2>
                <div className="space-y-6">
                  {program.updates.map((update) => (
                    <div key={update.id} className="relative pl-6 border-l-2 border-brand-sky space-y-1.5">
                      <div className="text-[11px] font-semibold text-brand-sky-dark">
                        {formatDateWita(update.publishedAt)}
                      </div>
                      <h3 className="font-bold text-base text-text-primary">{update.title}</h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                        {update.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Verified Donors (PAID) */}
            <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Donatur Terkini
                </h2>
                <span className="text-xs text-text-muted">
                  Total {stats.donationsCount} donasi terverifikasi
                </span>
              </div>

              {program.donations.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {program.donations.map((don) => (
                    <div key={don.id} className="py-3.5 flex justify-between items-start gap-4">
                      <div>
                        <span className="font-bold text-sm text-text-primary block">
                          {maskDonorName(don.donorName, don.isAnonymous)}
                        </span>
                        {don.message && (
                          <p className="text-xs text-text-muted italic mt-1">
                            &ldquo;{don.message}&rdquo;
                          </p>
                        )}
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          {formatDateWita(don.paidAt || don.createdAt)}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-brand-sky-dark flex-shrink-0">
                        {formatRupiah(don.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted text-center py-4">
                  Jadilah donatur pertama yang menghadirkan kebaikan untuk program ini.
                </p>
              )}
            </div>
          </div>

          {/* Right Sticky Column (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-border shadow-float p-6 sm:p-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-text-muted block">Dana Terkumpul</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-sky-dark font-serif block">
                  {formatRupiah(stats.collectedAmount)}
                </span>
                <span className="text-xs text-text-muted block">
                  dari target {program.targetAmount > 0 ? formatRupiah(program.targetAmount) : "kebutuhan terbuka"}
                </span>
              </div>

              <ProgramProgress percentage={stats.progressPercent} />

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Jumlah Donasi Lunas:</span>
                  <span className="font-bold text-text-primary">{stats.donationsCount} Donatur</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Realisasi Tersalurkan:</span>
                  <span className="font-bold text-text-primary">{formatRupiah(stats.disbursedAmount)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/donasi/${program.slug}`}
                  className="w-full py-4 rounded-2xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white font-bold text-sm shadow-soft hover:shadow-float transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <HeartHandshake className="w-5 h-5 text-brand-gold" />
                  <span>Donasi Sekarang</span>
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dikelola resmi Yayasan Ar-Rahmah</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
