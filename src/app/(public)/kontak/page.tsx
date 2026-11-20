"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3.5 py-1.5 rounded-full">
            <Mail className="w-3.5 h-3.5" />
            <span>Layanan Donatur & Kemitraan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Hubungi Ar-Rahmah Care
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Punya pertanyaan mengenai program, konfirmasi penyaluran donasi, atau ingin bersilaturahmi? Tim kami siap melayani Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-xs space-y-6">
              <h2 className="font-serif text-xl font-bold text-text-primary pb-3 border-b border-slate-100">
                Sekretariat Pusat
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">Alamat Kantor</span>
                    <span className="text-text-muted leading-relaxed">
                      Kompleks Yayasan Ar-Rahmah Sulawesi, Jl. Perintis Kemerdekaan, Makassar, Sulawesi Selatan 90245.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">Telepon & WhatsApp</span>
                    <span className="text-text-muted leading-relaxed">
                      (0411) 587-XXX · 0812-4200-XXXX
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">Email Resmi</span>
                    <span className="text-text-muted leading-relaxed">
                      care@arrahmahsulawesi.org
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-sky-soft text-brand-sky-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block">Jam Layanan Operasional</span>
                    <span className="text-text-muted leading-relaxed">
                      Senin – Jumat: 08.00 – 16.00 WITA <br />
                      Sabtu: 08.00 – 12.00 WITA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft">
              <h2 className="font-serif text-xl font-bold text-text-primary mb-2">
                Kirim Pesan atau Pertanyaan
              </h2>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                Silakan isi formulir berikut. Tim sekretariat akan merespon melalui email atau WhatsApp Anda.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-base">Pesan Anda Berhasil Terkirim</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Terima kasih telah menghubungi Ar-Rahmah Care. Pesan Anda telah kami terima dan akan segera kami tindak lanjuti.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="inline-block mt-3 text-xs font-semibold text-emerald-700 underline"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1">
                        Nomor WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">
                      Isi Pesan / Pertanyaan
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan pertanyaan, saran, atau keperluan Anda..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-sky-dark hover:bg-brand-sky-deep text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
