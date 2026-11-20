"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SessionPayload } from "@/lib/auth";
import {
  LayoutDashboard,
  HeartHandshake,
  Receipt,
  Users,
  SendHorizontal,
  FileSpreadsheet,
  Newspaper,
  Heart,
  Settings,
  History,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  session: SessionPayload;
  roleLabel: string;
}

export function AdminSidebar({ session, roleLabel }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
    { label: "Program Donasi", href: "/admin/program", icon: HeartHandshake },
    { label: "Transaksi Donasi", href: "/admin/donasi", icon: Receipt },
    { label: "Data Donatur", href: "/admin/donatur", icon: Users },
    { label: "Penyaluran Dana", href: "/admin/penyaluran", icon: SendHorizontal },
    { label: "Laporan Publikasi", href: "/admin/laporan", icon: FileSpreadsheet },
    { label: "Berita & Artikel", href: "/admin/berita", icon: Newspaper },
    { label: "Cerita Dampak", href: "/admin/dampak", icon: Heart },
    { label: "Pengaturan Lembaga", href: "/admin/pengaturan", icon: Settings },
    { label: "Jejak Audit", href: "/admin/audit-log", icon: History },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-700">
            <Image
              src="/brand/ar-rahmah-care.jpg"
              alt="Logo Ar-Rahmah Care"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-serif font-bold text-white text-base block leading-tight">
              Ar-Rahmah Care
            </span>
            <span className="text-[10px] text-brand-sky block">Panel Pengurus</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-brand-sky-dark text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Live Web Link */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="text-xs">
          <span className="font-semibold text-white block truncate">{session.displayName}</span>
          <span className="text-[10px] text-brand-sky-soft block truncate">{roleLabel}</span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Buka Website Publik</span>
        </Link>
      </div>
    </aside>
  );
}
