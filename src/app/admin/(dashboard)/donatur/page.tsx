import { db } from "@/lib/db";
import { formatDateWita, maskEmail, maskPhone } from "@/lib/format";
import { Users, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function AdminDonorsPage() {
  const donors = await db.donor.findMany({
    include: {
      _count: {
        select: { donations: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary">
          Data Donatur Terdaftar
        </h1>
        <p className="text-xs text-text-muted mt-0.5">
          Data identitas donatur dilindungi dan disanitasi sesuai prinsip privasi.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Nama Donatur</th>
                <th className="py-3 px-4">Email (Tersanitasi)</th>
                <th className="py-3 px-4">No. HP (Tersanitasi)</th>
                <th className="py-3 px-4 text-center">Total Transaksi</th>
                <th className="py-3 px-4 text-right">Tanggal Terdaftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donors.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-text-primary">
                    {d.name || "Donatur"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-text-muted">
                    {maskEmail(d.email)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-text-muted">
                    {maskPhone(d.phone)}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-brand-sky-dark">
                    {d._count.donations} Kali
                  </td>
                  <td className="py-3.5 px-4 text-right text-text-muted">
                    {formatDateWita(d.createdAt)}
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
