import Link from "next/link";
import { db } from "@/lib/db";
import { createProgramAction } from "../actions";
import { ArrowLeft, Save } from "lucide-react";

export default async function NewProgramPage() {
  const categories = await db.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/program"
          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Tambah Program Donasi Baru
          </h1>
          <p className="text-xs text-text-muted">
            Program akan ditampilkan pada publik setelah disetujui (PUBLISHED).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8">
        <form action={createProgramAction} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Judul Program *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Contoh: Beasiswa Santri Tahfizh Yatim"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Slug URL *
              </label>
              <input
                type="text"
                name="slug"
                required
                placeholder="beasiswa-santri-tahfizh-yatim"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Kategori *
              </label>
              <select
                name="categoryId"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Target Nominal (Rp)
              </label>
              <input
                type="number"
                name="targetAmount"
                defaultValue={100000000}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Status Publikasi
              </label>
              <select
                name="status"
                defaultValue="PUBLISHED"
                className="w-full px-3 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky bg-white"
              >
                <option value="DRAFT">DRAFT (Konsep)</option>
                <option value="PUBLISHED">PUBLISHED (Terbit & Aktif)</option>
                <option value="PAUSED">PAUSED (Dijeda)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Ringkasan Singkat (Summary) *
            </label>
            <textarea
              name="summary"
              required
              rows={2}
              placeholder="Deskripsi 1-2 kalimat untuk kartu depan..."
              className="w-full px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Deskripsi Lengkap Program *
            </label>
            <textarea
              name="body"
              required
              rows={5}
              placeholder="Jelaskan latar belakang, urgensi, dan sasaran program..."
              className="w-full px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Sasaran / Penerima Manfaat
              </label>
              <input
                type="text"
                name="beneficiaryDescription"
                placeholder="Santri yatim dhuafa SIT Ar-Rahmah Makassar"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Wilayah / Lokasi
              </label>
              <input
                type="text"
                name="locationLabel"
                placeholder="Makassar, Sulawesi Selatan"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              className="rounded text-brand-sky-dark focus:ring-brand-sky"
            />
            <label htmlFor="isFeatured" className="text-xs font-semibold text-text-primary cursor-pointer">
              Tampilkan sebagai Program Unggulan di Beranda
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              href="/admin/program"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-text-muted hover:bg-slate-50"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Publikasikan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
