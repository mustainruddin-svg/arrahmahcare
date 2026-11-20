"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function markDonationPaidAction(formData: FormData) {
  const session = await requireAuth(["SUPER_ADMIN", "FINANCE"]);
  const donationId = formData.get("donationId") as string;
  const notes = (formData.get("notes") as string) || "Verifikasi manual oleh bendahara";

  const donation = await db.donation.findUnique({
    where: { id: donationId },
  });

  if (!donation) {
    throw new Error("Donasi tidak ditemukan.");
  }

  await db.donation.update({
    where: { id: donationId },
    data: {
      status: "PAID",
      paidAt: new Date(),
      verifiedBy: session.email,
      verifiedAt: new Date(),
      notes,
    },
  });

  await db.auditLog.create({
    data: {
      actorId: session.userId,
      action: "DONATION_MANUALLY_VERIFIED",
      entity: "Donation",
      entityId: donationId,
      details: `Donasi order ${donation.orderId} senilai Rp ${donation.amount.toLocaleString("id-ID")} disahkan oleh ${session.email}`,
    },
  });

  revalidatePath("/admin/donasi");
  revalidatePath("/admin");
  revalidatePath("/program");
  revalidatePath(`/program/${donation.programId}`);
  revalidatePath("/laporan");
}
