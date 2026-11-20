"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, HeartHandshake, ShieldCheck } from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/program" },
    { label: "Laporan", href: "/laporan" },
    { label: "Dampak", href: "/dampak" },
    { label: "Berita", href: "/berita" },
    { label: "Tentang", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/80 py-3"
          : "bg-white border-b border-border/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-sm border border-border/60 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/ar-rahmah-care.jpg"
                alt="Logo Ar-Rahmah Care"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-text-primary group-hover:text-brand-sky-dark transition-colors">
                Ar-Rahmah Care
              </span>
              <span className="text-[11px] font-medium text-text-muted tracking-wide -mt-0.5">
                Amanah · Transparan · Sosial
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-sky-dark ${
                    isActive
                      ? "text-brand-sky-dark font-semibold border-b-2 border-brand-sky pb-0.5"
                      : "text-text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/program"
              className="text-xs md:text-sm font-semibold text-brand-sky-dark bg-brand-sky-soft hover:bg-brand-sky-soft/80 px-4 py-2 rounded-full transition-all"
            >
              Lihat Program
            </Link>
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-sky-dark hover:bg-brand-sky-deep shadow-soft hover:shadow-float px-5 py-2.5 rounded-full transition-all transform hover:-translate-y-0.5"
            >
              <HeartHandshake className="w-4 h-4 text-brand-gold" />
              <span>Donasi Sekarang</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-text-primary hover:bg-surface-subtle border border-border"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-border shadow-xl px-6 py-6 transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 border-b border-slate-100 ${
                    isActive ? "text-brand-sky-dark font-semibold" : "text-text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/program"
                className="w-full text-center py-3 rounded-xl bg-brand-sky-dark text-white font-semibold text-sm shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                🤲 Donasi Sekarang
              </Link>
              <Link
                href="/konfirmasi-donasi"
                className="w-full text-center py-2.5 rounded-xl border border-border text-text-primary font-medium text-sm hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Konfirmasi Transfer Manual
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
