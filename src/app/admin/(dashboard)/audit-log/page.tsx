import { db } from "@/lib/db";
import { formatDateTimeWita } from "@/lib/format";
import { History, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function AdminAuditLogPage() {
  const logs = await db.auditLog.findMany({
    include: { actor: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary">
          Jejak Audit Aktivitas Sistem
        </h1>
        <p className="text-xs text-text-muted mt-0.5">
          Rekaman jejak peristiwa keamanan, transaksi donasi, persetujuan penyaluran, dan perubahan data.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-text-muted font-semibold">
              <tr>
                <th className="py-3 px-4">Waktu (WITA)</th>
                <th className="py-3 px-4">Pengguna / Pelaku</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Entitas</th>
                <th className="py-3 px-4">Detail Peristiwa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-text-muted whitespace-nowrap">
                    {formatDateTimeWita(log.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-text-primary font-semibold whitespace-nowrap">
                    {log.actor?.email || "Sistem Otomatis"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-muted whitespace-nowrap">
                    {log.entity}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-sans text-xs max-w-md">
                    {log.details || "-"}
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
