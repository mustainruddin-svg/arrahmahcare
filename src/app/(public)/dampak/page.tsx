import { db } from "@/lib/db";
import { formatDateWita } from "@/lib/format";
import { Heart, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function ImpactPage() {
  const stories = await db.impactStory.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Cerita Nyata Dampak Kebaikan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Amanah Anda Mengubah Kehidupan
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Di balik setiap angka donasi, terdapat senyum anak yatim yang dapat terus bersekolah, keluarga yang tercukupi pangannya, dan sarana ibadah yang lebih layak.
          </p>
        </div>

        {/* Dignity & Consent Notice */}
        <div className="bg-surface-subtle border border-border rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3.5 text-xs text-text-muted">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Prinsip Martabat Penerima Manfaat:</strong> Seluruh cerita dan dokumentasi dipublikasikan dengan menjunjung tinggi kehormatan penerima bantuan, atas izin (consent) pihak terkait atau wali santri, tanpa mengeksploitasi kerentanan mereka.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-brand-sky-soft text-brand-sky-dark font-semibold px-3 py-1 rounded-full">
                    {story.beneficiaryLabel}
                  </span>
                  <span className="text-slate-400">
                    {formatDateWita(story.createdAt)}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                  {story.title}
                </h2>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                  {story.body}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dokumentasi Terverifikasi</span>
                </span>
                <span>Unit Ar-Rahmah Care</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
