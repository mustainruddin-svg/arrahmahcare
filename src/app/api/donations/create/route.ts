import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { db } from "@/lib/db";
import { getPaymentProvider } from "@/server/payments/provider";

const createDonationSchema = z.object({
  programId: z.string().min(1, "Program ID wajib diisi"),
  amount: z.number().int().min(10000, "Nominal minimal Rp 10.000"),
  donorName: z.string().optional().default("Hamba Allah"),
  donorEmail: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  donorPhone: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  message: z.string().max(500, "Pesan maksimal 500 karakter").optional(),
  paymentMethod: z.string().default("mock_qris"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = createDonationSchema.safeParse(json);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const {
      programId,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      isAnonymous,
      message,
      paymentMethod,
    } = parsed.data;

    // Check program existence and status
    const program = await db.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan." }, { status: 404 });
    }

    if (program.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Program ini sedang tidak menerima donasi." },
        { status: 400 }
      );
    }

    // Generate unique order ID: ARC-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
    const orderId = `ARC-${dateStr}-${randomSuffix}`;

    // Find or create donor if email provided
    let donorId: string | null = null;
    if (donorEmail && donorEmail.trim() !== "") {
      const existingDonor = await db.donor.findUnique({
        where: { email: donorEmail.trim().toLowerCase() },
      });

      if (existingDonor) {
        donorId = existingDonor.id;
      } else {
        const newDonor = await db.donor.create({
          data: {
            name: isAnonymous ? "Hamba Allah" : donorName || "Donatur",
            email: donorEmail.trim().toLowerCase(),
            phone: donorPhone || null,
            anonymousPublic: isAnonymous,
          },
        });
        donorId = newDonor.id;
      }
    }

    // Create Donation (PENDING)
    const donation = await db.donation.create({
      data: {
        orderId,
        programId: program.id,
        donorId,
        amount,
        status: "PENDING",
        paymentMethod,
        donorName: isAnonymous ? "Hamba Allah" : donorName,
        donorEmail: donorEmail || null,
        donorPhone: donorPhone || null,
        isAnonymous,
        message: message || null,
        expiresAt: new Date(Date.now() + 24 * 3600 * 1000), // 24 hours expiry
      },
    });

    // Create payment session via active PaymentProvider
    const provider = getPaymentProvider();
    const session = await provider.createPayment(donation, program);

    return NextResponse.json({
      success: true,
      orderId: donation.orderId,
      snapToken: session.snapToken,
      redirectUrl: session.redirectUrl,
      paymentMethod: donation.paymentMethod,
    });
  } catch (error: unknown) {
    console.error("Donation creation error:", error);
    const msg = error instanceof Error ? error.message : "Terjadi kesalahan internal server";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
