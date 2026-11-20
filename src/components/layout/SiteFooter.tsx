import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Identity & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-0.5">
                <Image
                  src="/brand/ar-rahmah-care.jpg"
                  alt="Logo Ar-Rahmah Care"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white block">
                  Ar-Rahmah Care
                </span>
                <span className="text-xs text-brand-sky">
                  Yayasan Ar-Rahmah Sulawesi
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unit kepedulian sosial & filantropi pendidikan yang lahir dari ekosistem Sekolah Islam Terpadu Ar-Rahmah Makassar (PAUD, SDIT, SMPIT, SMAIT). Mengelola amanah kebaikan secara transparan, akuntabel, dan terukur.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-brand-sky-soft">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparansi & Pembukuan Terlapor</span>
            </div>
          </div>

          {/* Col 2: Program Utama */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Program Penyaluran
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/program" className="hover:text-brand-sky transition-colors">
                  Beasiswa Santri Yatim & Dhuafa
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-brand-sky transition-colors">
                  Bantuan Bencana & Pangan Darurat
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-brand-sky transition-colors">
                  Renovasi Sarana Ibadah & Belajar
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-brand-sky transition-colors">
                  Sedekah Daging Sepanjang Tahun
                </Link>
              </li>
              <li>
                <Link href="/konfirmasi-donasi" className="hover:text-brand-sky transition-colors text-amber-300 font-medium">
                  &rarr; Konfirmasi Transfer Donasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Transparansi & Legalitas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Transparansi & Akun
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/laporan" className="hover:text-brand-sky transition-colors">
                  Laporan Realisasi Penyaluran
                </Link>
              </li>
              <li>
                <Link href="/dampak" className="hover:text-brand-sky transition-colors">
                  Cerita & Bukti Dampak
                </Link>
              </li>
              <li>
                <Link href="/legalitas" className="hover:text-brand-sky transition-colors">
                  Keterbukaan Status Legalitas
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-brand-sky transition-colors">
                  Kebijakan Privasi Donatur
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-brand-sky transition-colors">
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-sky transition-colors text-slate-400">
                  Portal Masuk Pengurus (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak Resmi */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Sekretariat & Kontak
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-sky flex-shrink-0 mt-1" />
              <span className="text-slate-400">
                Kompleks Yayasan Ar-Rahmah Sulawesi, Makassar, Sulawesi Selatan.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-sky flex-shrink-0" />
              <span className="text-slate-400">(0411) 587-XXX · 0812-4200-XXXX</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-sky flex-shrink-0" />
              <span className="text-slate-400">care@arrahmahsulawesi.org</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-brand-sky flex-shrink-0" />
              <span className="text-slate-400">Senin–Jumat: 08.00–16.00 WITA</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ar-Rahmah Care · Unit Amal Yayasan Ar-Rahmah Sulawesi. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/legalitas" className="hover:text-slate-300">
              Disclaimer Hukum
            </Link>
            <span>·</span>
            <Link href="/kebijakan-privasi" className="hover:text-slate-300">
              Privasi
            </Link>
            <span>·</span>
            <span className="text-amber-400 font-medium">Zona Waktu: Asia/Makassar (WITA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
