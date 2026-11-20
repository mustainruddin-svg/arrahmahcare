import { db } from "@/lib/db";
import { updateOrganizationSettingsAction } from "./actions";
import { Settings, ShieldCheck, Building2, Save, AlertTriangle } from "lucide-react";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const setting = await db.organizationSetting.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary">
          Pengaturan Lembaga & Konfigurasi Sistem
        </h1>
        <p className="text-xs text-text-muted mt-0.5">
          Seluruh data resmi lembaga, rekening bank terverifikasi, dan izin layanan dikendalikan di sini.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8">
        <form action={updateOrganizationSettingsAction} className="space-y-6">
          {/* Section 1: Profil Lembaga */}
          <div className="space-y-4">
            <h2 className="font-serif text-base font-bold text-text-primary pb-2 border-b border-slate-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-sky-dark" />
              <span>1. Identitas & Kontak Resmi</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nama Lembaga Resmi
                </label>
                <input
                  type="text"
                  name="organizationName"
                  defaultValue={setting?.organizationName || "Ar-Rahmah Care"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Slogan / Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={setting?.tagline || "Amanah, Transparan, Berkelanjutan"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Alamat Sekretariat Lengkap
              </label>
              <textarea
                name="address"
                rows={2}
                defaultValue={setting?.address || ""}
                className="w-full px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Email Resmi
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={setting?.email || ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  No. Telepon Kantor
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={setting?.phone || ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  No. WhatsApp Layanan
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  defaultValue={setting?.whatsapp || ""}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Rekening Bank Terverifikasi */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-base font-bold text-text-primary pb-2 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Rekening Bank Donasi Resmi</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nama Bank
                </label>
                <input
                  type="text"
                  name="verifiedBankName"
                  defaultValue={setting?.verifiedBankName || "Bank Syariah Indonesia (BSI)"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  name="verifiedAccountNo"
                  defaultValue={setting?.verifiedAccountNo || "7192-8831-22"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Atas Nama Rekening
                </label>
                <input
                  type="text"
                  name="verifiedAccountName"
                  defaultValue={setting?.verifiedAccountName || "Ar-Rahmah Care - Yayasan Ar-Rahmah Sulawesi"}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Klausul Keterbukaan Legalitas
              </label>
              <textarea
                name="legalDisclosure"
                rows={2}
                defaultValue={setting?.legalDisclosure || ""}
                className="w-full px-4 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>

          {/* Section 3: Feature Toggles */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="font-serif text-base font-bold text-text-primary pb-2 border-b border-slate-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-600" />
              <span>3. Saklar Fitur Layanan (Feature Gates)</span>
            </h2>

            <div className="space-y-3 bg-surface-subtle p-4 rounded-2xl border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-text-primary block">
                    Mode Sandbox Simulator
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Menampilkan banner simulasi aman dan mematikan penarikan uang riil.
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="demoMode"
                  defaultChecked={setting?.demoMode ?? true}
                  className="rounded text-brand-sky-dark focus:ring-brand-sky w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-xs text-text-primary block">
                    Layanan Transaksi Zakat Formal
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Wajib dinonaktifkan sampai izin LAZ resmi diverifikasi sesuai regulasi.
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="featureZakat"
                  defaultChecked={setting?.featureZakat ?? false}
                  className="rounded text-brand-sky-dark focus:ring-brand-sky w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="font-bold text-xs text-text-primary block">
                    Layanan Transaksi Wakaf Uang
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Wajib dinonaktifkan sampai izin Nazhir Wakaf resmi disahkan.
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="featureWakaf"
                  defaultChecked={setting?.featureWakaf ?? false}
                  className="rounded text-brand-sky-dark focus:ring-brand-sky w-4 h-4"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Lembaga</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
