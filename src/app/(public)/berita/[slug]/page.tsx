import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateWita } from "@/lib/format";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

export const revalidate = 0;

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;

  const article = await db.article.findUnique({
    where: { slug },
  });

  if (!article || article.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-brand-sky-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-sky-dark" />
              <span>{formatDateWita(article.publishedAt || article.createdAt)}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-brand-sky-dark" />
              <span>{article.authorName}</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-text-primary leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal italic">
            {article.excerpt}
          </p>
        </header>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-8 space-y-4">
          {article.body}
        </div>

        {/* Footer / Share */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <span>Diterbitkan oleh Humas & Media Yayasan Ar-Rahmah Sulawesi</span>
          <Link
            href="/program"
            className="font-semibold text-brand-sky-dark hover:underline"
          >
            &rarr; Salurkan Kepedulian Melalui Program Ar-Rahmah Care
          </Link>
        </div>
      </article>
    </div>
  );
}
