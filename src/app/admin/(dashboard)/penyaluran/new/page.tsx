import Link from "next/link";
import { db } from "@/lib/db";
import { createDisbursementAction } from "../actions";
import { ArrowLeft, Save } from "lucide-react";

export default async function NewDisbursementPage() {
  const programs = await db.program.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/penyaluran"
          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Pengajuan Penyaluran Dana Baru
          </h1>
          <p className="text-xs text-text-muted">
            Dana baru akan dibukukan ke laporan publik setelah mendapatkan persetujuan (Approval).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8">
        <form action={createDisbursementAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Program Penyaluran *
            </label>
            <select
              name="programId"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky bg-white"
            >
              <option value="">Pilih Program...</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Nominal Penyaluran (Rp) *
              </label>
              <input
                type="number"
                name="amount"
                required
                min={1000}
                placeholder="Contoh: 5000000"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Jumlah Penerima Manfaat (Jiwa)
              </label>
              <input
                type="number"
                name="beneficiaryCount"
                defaultValue={1}
                min={0}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Kategori Belanja
            </label>
            <input
              type="text"
              name="categoryLabel"
              placeholder="Contoh: Bantuan SPP, Logistik Sembako, Material Bangunan"
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Uraian & Keterangan Pengeluaran *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Rincian barang/bantuan dan pihak yang menerima..."
              className="w-full px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Catatan Bukti / Kuitansi Fisik
            </label>
            <input
              type="text"
              name="evidenceNotes"
              placeholder="Nomor kuitansi tata usaha, berita acara serah terima..."
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              href="/admin/penyaluran"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-text-muted hover:bg-slate-50"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Kirim Pengajuan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
