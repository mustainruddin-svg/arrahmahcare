import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateWita } from "@/lib/format";
import { Heart, Eye, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminImpactPage() {
  const stories = await db.impactStory.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Cerita & Dokumentasi Dampak
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Dokumentasi penerima manfaat dengan persetujuan (consent) yang menjunjung martabat.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Judul Cerita</th>
                <th className="py-3 px-4">Label Penerima</th>
                <th className="py-3 px-4 text-center">Persetujuan / Consent</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Lihat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stories.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-text-primary max-w-md">
                    <span className="block truncate">{s.title}</span>
                    <span className="text-[11px] text-text-muted font-normal block truncate">
                      {s.summary}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {s.beneficiaryLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {s.consentVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Disetujui</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        Menunggu
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <Link
                      href="/dampak"
                      target="_blank"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 inline-block"
                      title="Lihat di Halaman Dampak"
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
