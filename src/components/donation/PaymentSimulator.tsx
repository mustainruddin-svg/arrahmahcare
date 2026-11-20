"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah, formatDateTimeWita, maskDonorName } from "@/lib/format";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  QrCode,
  Building2,
  Copy,
  Printer,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";

interface PaymentSimulatorProps {
  donation: {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    paymentMethod: string;
    paymentChannel?: string | null;
    paidAt?: Date | string | null;
    createdAt: Date | string;
    donorName?: string | null;
    donorEmail?: string | null;
    isAnonymous: boolean;
    message?: string | null;
    program: {
      title: string;
      slug: string;
    };
  };
}

export function PaymentSimulator({ donation: initialDonation }: PaymentSimulatorProps) {
  const [donation, setDonation] = useState(initialDonation);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSimulateStatus = async (targetStatus: "settlement" | "expire") => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/donations/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: donation.orderId,
          transaction_status: targetStatus,
          status_code: "200",
          gross_amount: donation.amount.toString(),
          payment_type: donation.paymentMethod,
          transaction_id: `sim_${donation.orderId}_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDonation((prev) => ({
          ...prev,
          status: data.newStatus,
          paidAt: data.newStatus === "PAID" ? new Date().toISOString() : prev.paidAt,
        }));
      }
    } catch (err) {
      console.error("Simulation error", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const isPaid = donation.status === "PAID";
  const isPending = donation.status === "PENDING";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Status Header Banner */}
      <div
        className={`p-6 rounded-3xl border text-center transition-all ${
          isPaid
            ? "bg-emerald-50 border-emerald-200 text-emerald-950"
            : isPending
            ? "bg-sky-50 border-sky-200 text-sky-950"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 shadow-sm bg-white">
          {isPaid ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          ) : isPending ? (
            <Clock className="w-10 h-10 text-brand-sky-dark animate-pulse" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-amber-600" />
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-serif mb-1">
          {isPaid
            ? "Alhamdulillah, Donasi Berhasil Diterima!"
            : isPending
            ? "Menunggu Pembayaran Donasi"
            : `Status Donasi: ${donation.status}`}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          {isPaid
            ? "Terima kasih atas kepedulian dan amanah Anda. Kuitansi sah digital telah diterbitkan di bawah ini."
            : isPending
            ? "Silakan selesaikan pembayaran sesuai nominal dan instruksi di bawah ini."
            : "Sesi transaksi ini telah berakhir atau tidak dapat dilanjutkan."}
        </p>
      </div>

      {/* Sandbox Simulator Floating Box for testing */}
      {isPending && (
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Sandbox Payment Testing Simulator</span>
          </div>
          <p className="text-xs text-amber-800 mb-4 leading-relaxed">
            Karena akun merchant gateway resmi dan legalitas perizinan sedang dalam proses verifikasi pengelola, Anda dapat menguji seluruh siklus transaksi dan kuitansi menggunakan simulator di bawah ini:
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulateStatus("settlement")}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>Simulasikan Bayar Berhasil (PAID)</span>
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleSimulateStatus("expire")}
              className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-all disabled:opacity-50"
            >
              Simulasikan Kedaluwarsa
            </button>
          </div>
        </div>
      )}

      {/* Instruction Card (When Pending) */}
      {isPending && (
        <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 text-sm">
            <span className="text-text-muted">Nomor Pesanan / Order ID</span>
            <span className="font-mono font-bold text-text-primary">{donation.orderId}</span>
          </div>

          <div className="text-center py-2">
            <span className="text-xs text-text-muted block mb-1">Total yang harus dibayar:</span>
            <span className="text-3xl font-extrabold text-brand-sky-dark font-serif">
              {formatRupiah(donation.amount)}
            </span>
          </div>

          {/* QRIS Display */}
          {donation.paymentMethod === "mock_qris" ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-border text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-text-primary">
                <QrCode className="w-4 h-4 text-brand-sky-dark" />
                <span>Scan Kode QRIS di bawah ini</span>
              </div>

              {/* QR Code Graphic Placeholder */}
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-inner relative">
                <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-2 text-center">
                  <QrCode className="w-20 h-20 text-slate-700 mb-1" />
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    QRIS AR-RAHMAH CARE
                  </span>
                  <span className="text-[8px] text-slate-400">
                    NMID: ID1020029381 (Sandbox)
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                Dapat di-scan menggunakan seluruh aplikasi mobile banking (BSI, BCA, Mandiri, BRI, BNI) dan dompet digital (GoPay, OVO, Dana, ShopeePay, LinkAja).
              </p>
            </div>
          ) : (
            /* Bank Transfer Display */
            <div className="bg-slate-50 p-6 rounded-2xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
                <Building2 className="w-4 h-4 text-brand-sky-dark" />
                <span>Transfer Manual ke Rekening Resmi</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted block">Bank Syariah Indonesia (BSI)</span>
                  <span className="text-base font-mono font-bold text-text-primary block">
                    7192-8831-22
                  </span>
                  <span className="text-[11px] text-slate-500">
                    a.n. Ar-Rahmah Care - Yayasan Ar-Rahmah Sulawesi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("7192883122")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-brand-sky-dark hover:bg-slate-50 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? "Tersalin!" : "Salin"}</span>
                </button>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Setelah transfer, Anda dapat mengunggah bukti pembayaran melalui halaman{" "}
                <Link href="/konfirmasi-donasi" className="text-brand-sky-dark underline font-medium">
                  Konfirmasi Donasi
                </Link>{" "}
                atau menghubungi WhatsApp admin.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Digital Receipt Card (When Paid) */}
      {isPaid && (
        <div id="kuitansi-print" className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-start pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-0.5 border border-border">
                <Image
                  src="/brand/ar-rahmah-care.jpg"
                  alt="Logo Ar-Rahmah Care"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-text-primary block">
                  Ar-Rahmah Care
                </span>
                <span className="text-xs text-text-muted">
                  Kuitansi Donasi Sah Digital
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-text-muted block">Nomor Kuitansi</span>
              <span className="font-mono text-sm font-bold text-brand-sky-dark">
                {donation.orderId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm py-2">
            <div>
              <span className="text-text-muted block text-xs">Donatur</span>
              <span className="font-bold text-text-primary">
                {maskDonorName(donation.donorName, donation.isAnonymous)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-xs">Waktu Pembayaran</span>
              <span className="font-semibold text-text-primary">
                {formatDateTimeWita(donation.paidAt || donation.createdAt)}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-xs">Program Penyaluran</span>
              <span className="font-semibold text-text-primary">
                {donation.program.title}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-xs">Metode Pembayaran</span>
              <span className="font-semibold text-text-primary uppercase">
                {donation.paymentChannel || donation.paymentMethod}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
            <span className="font-semibold text-sm text-text-primary">Total Donasi Disalurkan</span>
            <span className="text-xl font-bold font-serif text-brand-sky-dark">
              {formatRupiah(donation.amount)}
            </span>
          </div>

          {donation.message && (
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-xs italic text-amber-900">
              &ldquo;{donation.message}&rdquo;
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 text-[11px] text-text-muted space-y-1">
            <p>
              • Kuitansi ini diterbitkan secara otomatis oleh sistem pencatatan digital Ar-Rahmah Care di bawah naungan Yayasan Ar-Rahmah Sulawesi.
            </p>
            <p>
              • Seluruh dana yang terkumpul disalurkan secara amanah dan dapat diaudit melalui halaman laporan publik kami.
            </p>
          </div>

          {/* Action Print */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-text-primary font-semibold text-xs flex items-center justify-center gap-2 transition-colors flex-1"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak / Simpan Kuitansi PDF</span>
            </button>
            <Link
              href={`/program/${donation.program.slug}`}
              className="py-3 px-4 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors flex-1 shadow-sm"
            >
              <span>Kembali ke Program</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
