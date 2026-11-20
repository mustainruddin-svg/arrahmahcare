import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PaymentSimulator } from "@/components/donation/PaymentSimulator";

export const revalidate = 0;

interface DonationStatusPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function DonationStatusPage({ params }: DonationStatusPageProps) {
  const { orderId } = await params;

  const donation = await db.donation.findUnique({
    where: { orderId },
    include: {
      program: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!donation) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <PaymentSimulator donation={donation} />
      </div>
    </div>
  );
}
