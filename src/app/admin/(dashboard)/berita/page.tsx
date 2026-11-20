import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateWita } from "@/lib/format";
import { Newspaper, Eye } from "lucide-react";

export const revalidate = 0;

export default async function AdminNewsPage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Manajemen Berita & Artikel
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Publikasikan artikel edukasi dan liputan kegiatan aksi sosial santri.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Judul Artikel</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Tanggal Terbit</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Lihat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-text-primary max-w-md">
                    <span className="block truncate">{a.title}</span>
                    <span className="text-[11px] text-text-muted font-normal block truncate">
                      /{a.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {a.authorName}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {formatDateWita(a.publishedAt || a.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <Link
                      href={`/berita/${a.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 inline-block"
                      title="Buka Artikel Publik"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
