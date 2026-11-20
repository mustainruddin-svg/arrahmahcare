import { db } from "@/lib/db";
import { getGlobalImpactStats } from "@/server/donations/stats";
import { formatRupiah, formatNumber, formatDateWita } from "@/lib/format";
import { ShieldCheck, FileText, Download, CheckCircle2, Building2 } from "lucide-react";

export const revalidate = 0;

export default async function PublicReportsPage() {
  const [globalStats, reports, postedDisbursements] = await Promise.all([
    getGlobalImpactStats(),
    db.report.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { periodEnd: "desc" },
    }),
    db.disbursement.findMany({
      where: { status: "POSTED" },
      include: { program: true },
      orderBy: { postedAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparansi & Akuntabilitas Publik</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Laporan Realisasi & Penyaluran
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Setiap rupiah amanah donasi dicatat, diawasi oleh bendahara yayasan, dan dilaporkan secara jujur kepada donatur dan masyarakat.
          </p>
        </div>

        {/* Global Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
            <span className="text-xs text-text-muted block mb-1">Total Dana Terkumpul (Net)</span>
            <span className="text-2xl font-bold font-serif text-brand-sky-dark block">
              {formatRupiah(globalStats.totalCollected)}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Dari donasi sah lunas</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
            <span className="text-xs text-text-muted block mb-1">Total Dana Disalurkan</span>
            <span className="text-2xl font-bold font-serif text-text-primary block">
              {formatRupiah(globalStats.totalDisbursed)}
            </span>
            <span className="text-[11px] text-brand-sky font-medium">Penyaluran disetujui (Posted)</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
            <span className="text-xs text-text-muted block mb-1">Saldo Tersisa (Belum Disalurkan)</span>
            <span className="text-2xl font-bold font-serif text-amber-700 block">
              {formatRupiah(globalStats.remainingBalance)}
            </span>
            <span className="text-[11px] text-text-muted">Siap dialokasikan</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
            <span className="text-xs text-text-muted block mb-1">Penerima Manfaat</span>
            <span className="text-2xl font-bold font-serif text-text-primary block">
              {formatNumber(globalStats.totalBeneficiaries)}
            </span>
            <span className="text-[11px] text-text-muted">Santri & keluarga dhuafa</span>
          </div>
        </div>

        {/* Section 1: Laporan Publikasi Internal */}
        <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6 mb-12">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Dokumen Publikasi Laporan Berkala
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Ringkasan berkala yang disahkan oleh pengurus Yayasan Ar-Rahmah Sulawesi.
            </p>
          </div>

          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-5 rounded-2xl border border-border/80 bg-surface-subtle hover:bg-slate-50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-brand-sky-dark bg-brand-sky-soft px-2.5 py-0.5 rounded-full inline-block">
                        Periode {formatDateWita(rep.periodStart)} – {formatDateWita(rep.periodEnd)}
                      </span>
                      <h3 className="font-bold text-base text-text-primary">{rep.title}</h3>
                    </div>
                    <FileText className="w-5 h-5 text-brand-sky-dark flex-shrink-0" />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {rep.summary}
                  </p>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
                    <span className="text-text-muted">Realisasi: {formatRupiah(rep.totalDisbursed)}</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Terverifikasi</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted text-center py-6">
              Belum ada dokumen laporan yang dipublikasikan.
            </p>
          )}
        </div>

        {/* Section 2: Riwayat Penyaluran Terakhir (Posted) */}
        <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-text-primary">
                Histori Penyaluran Dana Terkini
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Daftar rincian realisasi belanja dan penyaluran yang telah disetujui (Posted).
              </p>
            </div>
            <span className="text-xs text-text-muted">
              Menampilkan {postedDisbursements.length} transaksi terakhir
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
                <tr>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Kategori / Deskripsi</th>
                  <th className="py-3 px-4 text-center">Penerima</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {postedDisbursements.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                      {formatDateWita(d.postedAt || d.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">
                      {d.program.title}
                    </td>
                    <td className="py-3.5 px-4 text-text-muted max-w-xs">
                      {d.description}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium">
                      {d.beneficiaryCount > 0 ? `${d.beneficiaryCount} Jiwa` : "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-brand-sky-dark whitespace-nowrap">
                      {formatRupiah(d.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
