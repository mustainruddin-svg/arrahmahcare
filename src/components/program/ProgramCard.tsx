import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/lib/format";
import { ProgramProgress } from "./ProgramProgress";
import { HeartHandshake, ArrowRight, MapPin, Tag } from "lucide-react";

export interface ProgramCardData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string | null;
  targetAmount: number;
  collectedAmount: number;
  progressPercent: number;
  categoryName?: string;
  locationLabel?: string | null;
  isFeatured?: boolean;
}

export function ProgramCard({ program }: { program: ProgramCardData }) {
  const isTargetSet = program.targetAmount > 0;

  return (
    <div className="group bg-white rounded-2xl border border-border/80 shadow-card hover:shadow-float transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Cover / Visual */}
      <div className="relative h-48 w-full bg-slate-50 overflow-hidden flex items-center justify-center p-4">
        {program.coverImage ? (
          <Image
            src={program.coverImage}
            alt={program.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-4xl text-brand-sky">🤲</div>
        )}

        {/* Category Pill */}
        {program.categoryName && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-border/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-brand-sky-dark flex items-center gap-1 shadow-sm">
            <Tag className="w-3 h-3 text-brand-sky" />
            <span>{program.categoryName}</span>
          </div>
        )}

        {/* Location or Status */}
        {program.locationLabel && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-600 flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>{program.locationLabel}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/program/${program.slug}`} className="group-hover:text-brand-sky-dark transition-colors">
          <h3 className="font-serif font-bold text-lg text-text-primary line-clamp-2 mb-2 leading-snug">
            {program.title}
          </h3>
        </Link>
        <p className="text-text-muted text-xs md:text-sm line-clamp-2 mb-5 leading-relaxed flex-1">
          {program.summary}
        </p>

        {/* Progress Bar & Amounts */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <ProgramProgress percentage={program.progressPercent} />

          <div className="flex justify-between items-baseline text-xs">
            <div>
              <span className="text-text-muted block text-[11px]">Terkumpul</span>
              <span className="font-bold text-text-primary text-sm">
                {formatRupiah(program.collectedAmount)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-text-muted block text-[11px]">Target</span>
              <span className="font-medium text-text-muted">
                {isTargetSet ? formatRupiah(program.targetAmount) : "Kebutuhan Terbuka"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/program/${program.slug}`}
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-text-primary bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2.5 px-3 rounded-xl transition-colors"
          >
            <span>Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/donasi/${program.slug}`}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-brand-sky-dark hover:bg-brand-sky-deep py-2.5 px-3 rounded-xl shadow-sm transition-all"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-brand-gold" />
            <span>Donasi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
