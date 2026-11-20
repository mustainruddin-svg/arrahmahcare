import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateWita } from "@/lib/format";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

export const revalidate = 0;

export default async function NewsListPage() {
  const articles = await db.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kabar & Artikel Edukasi</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Berita & Aktivitas Ar-Rahmah Care
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Ikuti kabar penyaluran, aksi sosial relawan santri, dan artikel edukasi filantropi Islam dari lingkungan SIT Ar-Rahmah Makassar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-border shadow-xs hover:shadow-card transition-all flex flex-col p-6 group"
            >
              <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                <Calendar className="w-3.5 h-3.5 text-brand-sky-dark" />
                <span>{formatDateWita(article.publishedAt || article.createdAt)}</span>
              </div>

              <Link href={`/berita/${article.slug}`}>
                <h2 className="font-serif font-bold text-lg text-text-primary group-hover:text-brand-sky-dark transition-colors line-clamp-2 mb-3">
                  {article.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-text-muted line-clamp-3 mb-6 flex-1 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{article.authorName}</span>
                <Link
                  href={`/berita/${article.slug}`}
                  className="font-semibold text-brand-sky-dark hover:underline flex items-center gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
