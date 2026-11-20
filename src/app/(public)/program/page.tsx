import Link from "next/link";
import { db } from "@/lib/db";
import { getProgramStats } from "@/server/donations/stats";
import { ProgramCard } from "@/components/program/ProgramCard";
import { Search, Tag, Sparkles } from "lucide-react";

export const revalidate = 0;

interface ProgramPageProps {
  searchParams: Promise<{
    kategori?: string;
    q?: string;
  }>;
}

export default async function ProgramListPage({ searchParams }: ProgramPageProps) {
  const { kategori, q } = await searchParams;

  const [categories, programsRaw] = await Promise.all([
    db.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    db.program.findMany({
      where: {
        status: "PUBLISHED",
        ...(kategori ? { category: { slug: kategori } } : {}),
        ...(q
          ? {
              OR: [
                { title: { contains: q } },
                { summary: { contains: q } },
              ],
            }
          : {}),
      },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const programs = await Promise.all(
    programsRaw.map(async (p) => {
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
    <div className="py-12 sm:py-16 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Program Kebaikan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Daftar Program Penyaluran
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Pilih program yang ingin Anda dukung. Seluruh donasi dicatat secara transparan dan diverifikasi oleh sistem akuntansi lembaga.
          </p>
        </div>

        {/* Filter & Category Pills */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/program"
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                !kategori
                  ? "bg-brand-sky-dark text-white border-brand-sky-dark shadow-xs"
                  : "bg-white text-text-primary border-border hover:bg-slate-50"
              }`}
            >
              Semua Program
            </Link>
            {categories.map((cat) => {
              const isSelected = kategori === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/program?kategori=${cat.slug}`}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    isSelected
                      ? "bg-brand-sky-dark text-white border-brand-sky-dark shadow-xs"
                      : "bg-white text-text-primary border-border hover:bg-slate-50"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Programs Grid */}
        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-border p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Tag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-text-primary">
              Tidak ada program ditemukan
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Belum ada program aktif pada kategori yang dipilih. Silakan pilih kategori lain atau kembali ke seluruh program.
            </p>
            <Link
              href="/program"
              className="inline-block text-xs font-semibold text-brand-sky-dark bg-brand-sky-soft hover:bg-brand-sky-soft/80 px-4 py-2 rounded-xl transition-colors"
            >
              Tampilkan Semua Program
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
