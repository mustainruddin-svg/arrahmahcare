import Link from "next/link";
import { db } from "@/lib/db";
import { formatRupiah, formatDateWita, maskDonorName } from "@/lib/format";
import { markDonationPaidAction } from "./actions";
import { Receipt, Download, CheckCircle2, Clock, Filter, Eye } from "lucide-react";

export const revalidate = 0;

interface DonationsPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function AdminDonationsPage({ searchParams }: DonationsPageProps) {
  const { status } = await searchParams;

  const donations = await db.donation.findMany({
    where: {
      ...(status && status !== "ALL" ? { status } : {}),
    },
    include: {
      program: true,
      donor: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Daftar Transaksi Donasi
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Pantau status transaksi, mutasi bank masuk, dan verifikasi rekonsiliasi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/reports/export?type=donations"
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor CSV</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {["ALL", "PAID", "PENDING", "EXPIRED", "CANCELLED"].map((st) => {
          const isSelected = (!status && st === "ALL") || status === st;
          return (
            <Link
              key={st}
              href={st === "ALL" ? "/admin/donasi" : `/admin/donasi?status=${st}`}
              className={`py-2 px-3.5 rounded-xl font-semibold border transition-all ${
                isSelected
                  ? "bg-brand-sky-dark text-white border-brand-sky-dark shadow-xs"
                  : "bg-white text-text-muted border-border hover:bg-slate-50"
              }`}
            >
              {st === "ALL" ? "Semua Status" : st}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Donatur</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                <th className="py-3 px-4 text-center">Metode</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donations.map((don) => (
                <tr key={don.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-text-primary whitespace-nowrap">
                    {don.orderId}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    {formatDateWita(don.paidAt || don.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 text-text-primary font-medium max-w-xs truncate">
                    {don.program.title}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    <span className="font-semibold text-text-primary block">
                      {maskDonorName(don.donorName, don.isAnonymous)}
                    </span>
                    {don.isAnonymous && (
                      <span className="text-[10px] text-slate-400 block">(Anonim)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-brand-sky-dark whitespace-nowrap">
                    {formatRupiah(don.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700">
                      {don.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        don.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : don.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {don.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`/donasi/status/${don.orderId}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Buka Kuitansi / Simulator"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      {don.status === "PENDING" && (
                        <form action={markDonationPaidAction} className="inline-block">
                          <input type="hidden" name="donationId" value={don.id} />
                          <button
                            type="submit"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                            title="Verifikasi Lunas (Mark as Paid)"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
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
