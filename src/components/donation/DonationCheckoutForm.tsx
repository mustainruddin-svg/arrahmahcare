"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/lib/format";
import { ShieldCheck, Heart, QrCode, Building2, AlertCircle, Loader2 } from "lucide-react";

interface DonationCheckoutFormProps {
  programId: string;
  programTitle: string;
  programSlug: string;
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

export function DonationCheckoutForm({
  programId,
  programTitle,
  programSlug,
}: DonationCheckoutFormProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("mock_qris");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const effectiveAmount = customAmount ? parseInt(customAmount.replace(/[^0-9]/g, ""), 10) || 0 : amount;

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(raw);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (effectiveAmount < 10000) {
      setErrorMessage("Nominal donasi minimal Rp 10.000");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          amount: effectiveAmount,
          donorName: isAnonymous ? "Hamba Allah" : donorName.trim() || "Hamba Allah",
          donorEmail: donorEmail.trim() || undefined,
          donorPhone: donorPhone.trim() || undefined,
          isAnonymous,
          message: message.trim() || undefined,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi donasi");
      }

      // Redirect to status & simulator page
      router.push(`/donasi/status/${data.orderId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses donasi";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8">
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Pilih Nominal */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-text-primary mb-3">
          1. Pilih Nominal Donasi
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
          {PRESET_AMOUNTS.map((val) => {
            const isSelected = !customAmount && amount === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => handleSelectPreset(val)}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  isSelected
                    ? "bg-brand-sky-soft border-brand-sky-dark text-brand-sky-deep shadow-sm"
                    : "bg-white border-border text-text-primary hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {formatRupiah(val)}
              </button>
            );
          })}
        </div>

        <div>
          <label className="text-xs text-text-muted block mb-1.5 font-medium">
            Atau masukkan nominal lainnya:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
              Rp
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 150.000"
              value={customAmount ? parseInt(customAmount, 10).toLocaleString("id-ID") : ""}
              onChange={handleCustomChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-brand-sky"
            />
          </div>
          <span className="text-[11px] text-text-muted mt-1 block">
            Minimal donasi Rp 10.000
          </span>
        </div>
      </div>

      {/* 2. Data Donatur */}
      <div className="mb-8 pt-6 border-t border-slate-100">
        <label className="block text-sm font-bold text-text-primary mb-3">
          2. Data Donatur
        </label>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-text-primary">
                Nama Lengkap
              </label>
              <label className="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-brand-sky-dark focus:ring-brand-sky"
                />
                <span>Sembunyikan nama (Hamba Allah)</span>
              </label>
            </div>
            <input
              type="text"
              disabled={isAnonymous}
              placeholder={isAnonymous ? "Hamba Allah" : "Nama Anda atau orang tua"}
              value={isAnonymous ? "Hamba Allah" : donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-text-primary block mb-1">
                Email (untuk kuitansi digital)
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-primary block mb-1">
                WhatsApp / No. HP (opsional)
              </label>
              <input
                type="tel"
                placeholder="081234567890"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-text-primary block mb-1">
              Doa atau Pesan Kebaikan (opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Tuliskan doa atau pesan untuk adik-adik dan saudara kita..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
            />
          </div>
        </div>
      </div>

      {/* 3. Metode Pembayaran */}
      <div className="mb-8 pt-6 border-t border-slate-100">
        <label className="block text-sm font-bold text-text-primary mb-3">
          3. Pilih Metode Pembayaran
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("mock_qris")}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              paymentMethod === "mock_qris"
                ? "bg-brand-sky-soft border-brand-sky-dark shadow-sm"
                : "bg-white border-border hover:bg-slate-50"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-brand-sky-dark shadow-xs flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block text-text-primary">QRIS Instant</span>
              <span className="text-xs text-text-muted block">
                GoPay, OVO, Dana, ShopeePay, BSI Mobile, dan semua m-Banking
              </span>
              <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Verifikasi Otomatis
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("manual_bank_transfer")}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              paymentMethod === "manual_bank_transfer"
                ? "bg-brand-sky-soft border-brand-sky-dark shadow-sm"
                : "bg-white border-border hover:bg-slate-50"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-brand-sky-dark shadow-xs flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block text-text-primary">Transfer Bank BSI</span>
              <span className="text-xs text-text-muted block">
                Rekening resmi Ar-Rahmah Care via Bank Syariah Indonesia
              </span>
              <span className="inline-block mt-1 text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                Konfirmasi Manual / Cepat
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Summary Box & CTA */}
      <div className="bg-surface-subtle p-5 rounded-2xl border border-border mb-6">
        <div className="flex justify-between items-center text-sm mb-1.5">
          <span className="text-text-muted">Program:</span>
          <span className="font-semibold text-text-primary text-right max-w-[240px] truncate">
            {programTitle}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60">
          <span className="font-semibold text-text-primary">Total Donasi:</span>
          <span className="text-xl font-extrabold text-brand-sky-dark font-serif">
            {formatRupiah(effectiveAmount)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || effectiveAmount < 10000}
        className="w-full py-4 rounded-2xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white font-bold text-base shadow-soft hover:shadow-float transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Membuat Sesi Donasi...</span>
          </>
        ) : (
          <>
            <Heart className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <span>Lanjutkan Pembayaran Donasi</span>
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Aman & Terenkripsi · Mode Sandbox Simulasi Aktif</span>
      </div>
    </form>
  );
}
