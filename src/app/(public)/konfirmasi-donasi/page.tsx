"use client";

import { useState } from "react";
import { CheckCircle2, Building2, UploadCloud, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [bankSender, setBankSender] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !donorName || !amount) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verifikasi Pembayaran Manual</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
            Konfirmasi Transfer Donasi
          </h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Jika Anda melakukan donasi melalui transfer bank manual, silakan konfirmasi detail transfer Anda di bawah ini agar tim bendahara dapat memverifikasi transaksi Anda.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-soft p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h2 className="font-serif font-bold text-xl text-text-primary">
                Konfirmasi Donasi Berhasil Dikirim
              </h2>
              <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                Terima kasih. Data konfirmasi untuk Order ID <strong>{orderId}</strong> telah diterima tim keuangan. Kami akan memverifikasi mutasi bank dan memperbarui status donasi Anda.
              </p>
              <div className="pt-2">
                <a
                  href={`/donasi/status/${orderId}`}
                  className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-brand-sky-dark text-white font-semibold text-xs shadow-sm hover:bg-brand-sky-deep transition-all"
                >
                  <span>Lihat Status Pesanan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nomor Pesanan / Order ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: ARC-202611-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Nama Pemilik Rekening Pengirim
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama di buku tabungan"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Nominal Transfer (Rp)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 100.000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Tanggal & Jam Transfer
                  </label>
                  <input
                    type="date"
                    required
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Bank Asal Pengirim
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: BSI, Mandiri, BCA"
                    value={bankSender}
                    onChange={(e) => setBankSender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Catatan Tambahan (opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Keterangan tambahan jika diperlukan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white font-bold text-sm shadow-soft transition-all"
              >
                Kirim Konfirmasi Transfer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
