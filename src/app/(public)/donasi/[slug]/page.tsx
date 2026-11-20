import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { DonationCheckoutForm } from "@/components/donation/DonationCheckoutForm";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const revalidate = 0;

interface DonationPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DonationCheckoutPage({ params }: DonationPageProps) {
  const { slug } = await params;

  const program = await db.program.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!program || program.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={`/program/${program.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-brand-sky-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Detail Program</span>
          </Link>
        </div>

        {/* Page Title & Program Header */}
        <div className="mb-8 text-center space-y-2">
          <span className="text-xs font-bold text-brand-sky-dark uppercase tracking-wider bg-brand-sky-soft px-3 py-1 rounded-full">
            Formulir Donasi Online
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">
            {program.title}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto">
            Setiap rupiah amanah yang Anda titipkan akan disalurkan tepat sasaran dan dilaporkan secara berkala.
          </p>
        </div>

        {/* Checkout Form */}
        <DonationCheckoutForm
          programId={program.id}
          programTitle={program.title}
          programSlug={program.slug}
        />
      </div>
    </div>
  );
}
