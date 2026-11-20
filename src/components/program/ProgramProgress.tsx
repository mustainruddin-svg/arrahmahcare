interface ProgramProgressProps {
  percentage: number;
  showLabel?: boolean;
  colorScheme?: "sky" | "gold";
  className?: string;
}

export function ProgramProgress({
  percentage,
  showLabel = true,
  colorScheme = "sky",
  className = "",
}: ProgramProgressProps) {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-text-muted">Capaian Donasi</span>
          <span className={colorScheme === "gold" ? "text-brand-gold-dark" : "text-brand-sky-dark"}>
            {clampedPct}%
          </span>
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            colorScheme === "gold"
              ? "bg-gradient-to-r from-amber-400 to-brand-gold"
              : "bg-gradient-to-r from-brand-sky to-brand-sky-dark"
          }`}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
    </div>
  );
}
