"use client";

import { useRouter } from "next/navigation";
import { SessionPayload } from "@/lib/auth";
import { LogOut, UserCircle2, ShieldCheck } from "lucide-react";

interface AdminTopbarProps {
  session: SessionPayload;
  roleLabel: string;
}

export function AdminTopbar({ session, roleLabel }: AdminTopbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <header className="bg-white border-b border-border px-6 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-text-muted">
          Dashboard Pengurus Ar-Rahmah Care
        </span>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-bold text-brand-sky-dark bg-brand-sky-soft px-2.5 py-0.5 rounded-full">
          Mode Sandbox
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <UserCircle2 className="w-5 h-5 text-brand-sky-dark" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-text-primary block leading-none">
              {session.displayName}
            </span>
            <span className="text-[10px] text-text-muted">{roleLabel}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Keluar"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
