import Link from "next/link";
import { db } from "@/lib/db";
import { getProgramStats } from "@/server/donations/stats";
import { formatRupiah } from "@/lib/format";
import { HeartHandshake, Plus, Eye, Edit3, Tag } from "lucide-react";

export const revalidate = 0;

export default async function AdminProgramListPage() {
  const programsRaw = await db.program.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const programs = await Promise.all(
    programsRaw.map(async (p) => {
      const stats = await getProgramStats(p.id, p.targetAmount);
      return {
        ...p,
        stats,
      };
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Manajemen Program Donasi
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Kelola kampanye penyaluran, target nominal, dan status publikasi.
          </p>
        </div>
        <Link
          href="/admin/program/new"
          className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-semibold shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Program Baru</span>
        </Link>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Judul Program</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-right">Target</th>
                <th className="py-3 px-4 text-right">Terkumpul (PAID)</th>
                <th className="py-3 px-4 text-center">Progres</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-text-primary max-w-xs">
                    <span className="block truncate">{p.title}</span>
                    <span className="text-[11px] text-text-muted font-normal block truncate">
                      /{p.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-700">
                      {p.category.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-text-muted whitespace-nowrap">
                    {p.targetAmount > 0 ? formatRupiah(p.targetAmount) : "Terbuka"}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-brand-sky-dark whitespace-nowrap">
                    {formatRupiah(p.stats.collectedAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-text-primary whitespace-nowrap">
                    {p.stats.progressPercent}%
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "DRAFT"
                          ? "bg-slate-100 text-slate-700"
                          : p.status === "PAUSED"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/program/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Lihat Halaman Publik"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
