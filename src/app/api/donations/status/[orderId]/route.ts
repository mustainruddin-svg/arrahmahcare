import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { maskDonorName } from "@/lib/format";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
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
      return NextResponse.json({ error: "Donasi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      orderId: donation.orderId,
      amount: donation.amount,
      status: donation.status,
      paymentMethod: donation.paymentMethod,
      paidAt: donation.paidAt,
      donorName: maskDonorName(donation.donorName, donation.isAnonymous),
      programTitle: donation.program.title,
      programSlug: donation.program.slug,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
