import Link from "next/link";
import { db } from "@/lib/db";
import { formatRupiah, formatDateWita } from "@/lib/format";
import { approveAndPostDisbursementAction } from "./actions";
import { SendHorizontal, Plus, Download, CheckCircle, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminDisbursementPage() {
  const disbursements = await db.disbursement.findMany({
    include: { program: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Pengajuan & Persetujuan Penyaluran Dana
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Menerapkan prinsip maker-checker: pengajuan diverifikasi dan dibukukan (POSTED) sebelum masuk laporan publik.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/reports/export?type=disbursements"
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor CSV</span>
          </a>
          <Link
            href="/admin/penyaluran/new"
            className="py-2.5 px-4 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Penyaluran</span>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Keterangan / Kategori</th>
                <th className="py-3 px-4 text-center">Penerima</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi / Approval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disbursements.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {formatDateWita(d.postedAt || d.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-text-primary max-w-xs truncate">
                    {d.program.title}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted max-w-xs">
                    <span className="text-text-primary block font-medium truncate">{d.description}</span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      Oleh: {d.submittedBy}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-medium">
                    {d.beneficiaryCount > 0 ? `${d.beneficiaryCount} Jiwa` : "-"}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-brand-sky-dark whitespace-nowrap">
                    {formatRupiah(d.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        d.status === "POSTED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : d.status === "SUBMITTED"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {d.status === "SUBMITTED" ? (
                      <form action={approveAndPostDisbursementAction} className="inline-block">
                        <input type="hidden" name="disbursementId" value={d.id} />
                        <button
                          type="submit"
                          className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve & Post</span>
                        </button>
                      </form>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">
                        Selesai ({d.approvedBy || "Admin"})
                      </span>
                    )}
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
