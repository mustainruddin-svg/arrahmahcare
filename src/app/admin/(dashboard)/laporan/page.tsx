import { db } from "@/lib/db";
import { formatRupiah, formatDateWita } from "@/lib/format";
import { FileSpreadsheet, Download, Plus, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminReportsPage() {
  const reports = await db.report.findMany({
    orderBy: { periodEnd: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Laporan Keuangan & Publikasi
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Publikasikan ikhtisar keuangan semesteran atau tahunan untuk transparansi donatur.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/reports/export?type=donations"
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor Donasi CSV</span>
          </a>
          <a
            href="/api/reports/export?type=disbursements"
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor Penyaluran CSV</span>
          </a>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Judul Dokumen</th>
                <th className="py-3 px-4">Periode</th>
                <th className="py-3 px-4 text-right">Dana Terkumpul</th>
                <th className="py-3 px-4 text-right">Dana Disalurkan</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-text-primary">
                    <span className="block">{r.title}</span>
                    <span className="text-[11px] text-text-muted font-normal block truncate max-w-sm">
                      {r.summary}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {formatDateWita(r.periodStart)} – {formatDateWita(r.periodEnd)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-brand-sky-dark whitespace-nowrap">
                    {formatRupiah(r.totalCollected)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-text-primary whitespace-nowrap">
                    {formatRupiah(r.totalDisbursed)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {r.status}
                    </span>
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
