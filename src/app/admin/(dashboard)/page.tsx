import Link from "next/link";
import { db } from "@/lib/db";
import { getGlobalImpactStats } from "@/server/donations/stats";
import { formatRupiah, formatNumber, formatDateWita, maskDonorName } from "@/lib/format";
import {
  HeartHandshake,
  SendHorizontal,
  Receipt,
  Users,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [globalStats, pendingDonationsCount, recentDonations, pendingDisbursements, recentLogs] =
    await Promise.all([
      getGlobalImpactStats(),
      db.donation.count({
        where: { status: "PENDING" },
      }),
      db.donation.findMany({
        include: { program: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.disbursement.findMany({
        where: { status: { in: ["DRAFT", "SUBMITTED"] } },
        include: { program: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      db.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
            Ringkasan Pengelolaan & Akuntansi
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Data keuangan dihitung langsung dari transaksi terkonfirmasi di database (Live Ledger).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/program/new"
            className="py-2.5 px-4 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <span>+ Buat Program Baru</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-xs">
          <span className="text-xs text-text-muted block mb-1">Total Donasi Lunas (Net)</span>
          <span className="text-2xl font-bold font-serif text-brand-sky-dark block">
            {formatRupiah(globalStats.totalCollected)}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium">Status PAID</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-xs">
          <span className="text-xs text-text-muted block mb-1">Dana Disalurkan</span>
          <span className="text-2xl font-bold font-serif text-text-primary block">
            {formatRupiah(globalStats.totalDisbursed)}
          </span>
          <span className="text-[11px] text-brand-sky font-medium">Status POSTED</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-xs">
          <span className="text-xs text-text-muted block mb-1">Saldo Kas Donasi Tersisa</span>
          <span className="text-2xl font-bold font-serif text-amber-700 block">
            {formatRupiah(globalStats.remainingBalance)}
          </span>
          <span className="text-[11px] text-text-muted">Siap dialokasikan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-xs">
          <span className="text-xs text-text-muted block mb-1">Donasi Pending</span>
          <span className="text-2xl font-bold font-serif text-text-primary block">
            {pendingDonationsCount} Transaksi
          </span>
          <span className="text-[11px] text-amber-600 font-medium">Menunggu pembayaran</span>
        </div>
      </div>

      {/* 2-Column Split: Recent Donations & Pending Disbursements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Donations */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-border shadow-soft p-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-serif font-bold text-base text-text-primary">
              Transaksi Donasi Terkini
            </h2>
            <Link
              href="/admin/donasi"
              className="text-xs font-semibold text-brand-sky-dark hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentDonations.map((don) => (
              <div key={don.id} className="py-3 flex justify-between items-center gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-text-primary">{don.orderId}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        don.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : don.status === "PENDING"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {don.status}
                    </span>
                  </div>
                  <span className="text-text-muted block mt-0.5">
                    {maskDonorName(don.donorName, don.isAnonymous)} · {don.program.title}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-text-primary block">
                    {formatRupiah(don.amount)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {formatDateWita(don.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pending Disbursements & Audit Trail */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pending Disbursements */}
          <div className="bg-white rounded-3xl border border-border shadow-soft p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h2 className="font-serif font-bold text-base text-text-primary">
                Pengajuan Penyaluran Dana
              </h2>
              <Link
                href="/admin/penyaluran"
                className="text-xs font-semibold text-brand-sky-dark hover:underline"
              >
                Kelola
              </Link>
            </div>

            {pendingDisbursements.length > 0 ? (
              <div className="space-y-3">
                {pendingDisbursements.map((disb) => (
                  <div key={disb.id} className="p-3 bg-surface-subtle rounded-xl border border-border text-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-text-primary">{disb.program.title}</span>
                      <span className="font-bold text-brand-sky-dark">{formatRupiah(disb.amount)}</span>
                    </div>
                    <p className="text-text-muted text-[11px] line-clamp-1">{disb.description}</p>
                    <div className="flex justify-between items-center pt-1 text-[10px] text-slate-400">
                      <span>Status: {disb.status}</span>
                      <span>Oleh: {disb.submittedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted py-2 text-center">
                Tidak ada pengajuan penyaluran yang menunggu persetujuan.
              </p>
            )}
          </div>

          {/* Recent Audit Log */}
          <div className="bg-white rounded-3xl border border-border shadow-soft p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h2 className="font-serif font-bold text-base text-text-primary">
                Aktivitas Sistem Terkini
              </h2>
              <Link
                href="/admin/audit-log"
                className="text-xs font-semibold text-brand-sky-dark hover:underline"
              >
                Semua
              </Link>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="text-xs border-b border-slate-100 pb-2 space-y-0.5 last:border-0">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-text-primary">{log.action}</span>
                    <span className="text-slate-400">{formatDateWita(log.createdAt)}</span>
                  </div>
                  <p className="text-text-muted text-[11px] truncate">{log.details || log.entity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
