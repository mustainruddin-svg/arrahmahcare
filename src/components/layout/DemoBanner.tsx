import Link from "next/link";
import { AlertCircle, ShieldAlert } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>MODE SANDBOX / DEMO:</strong> Website ini beroperasi dengan simulasi transaksi aman. Tidak ada penarikan uang riil.
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/legalitas"
            className="underline hover:text-amber-950 font-medium"
          >
            Status Legalitas
          </Link>
          <span>·</span>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 font-semibold text-brand-sky-dark hover:underline"
          >
            Dashboard Admin &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
