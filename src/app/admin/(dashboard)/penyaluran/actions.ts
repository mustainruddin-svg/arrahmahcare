"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function createDisbursementAction(formData: FormData) {
  const session = await requireAuth(["SUPER_ADMIN", "ADMIN_PROGRAM", "FINANCE"]);

  const programId = formData.get("programId") as string;
  const amount = parseInt(formData.get("amount") as string, 10);
  const description = formData.get("description") as string;
  const categoryLabel = (formData.get("categoryLabel") as string) || "Operasional Program";
  const beneficiaryCount = parseInt(formData.get("beneficiaryCount") as string, 10) || 0;
  const evidenceNotes = (formData.get("evidenceNotes") as string) || null;

  if (!programId || isNaN(amount) || amount <= 0 || !description) {
    throw new Error("Nominal dan keterangan penyaluran wajib diisi valid.");
  }

  await db.disbursement.create({
    data: {
      programId,
      amount,
      description,
      categoryLabel,
      beneficiaryCount,
      status: "SUBMITTED",
      submittedBy: session.email,
      evidenceNotes,
    },
  });

  await db.auditLog.create({
    data: {
      actorId: session.userId,
      action: "DISBURSEMENT_SUBMITTED",
      entity: "Disbursement",
      details: `Pengajuan penyaluran Rp ${amount.toLocaleString("id-ID")} diajukan oleh ${session.email}`,
    },
  });

  revalidatePath("/admin/penyaluran");
  redirect("/admin/penyaluran");
}

export async function approveAndPostDisbursementAction(formData: FormData) {
  const session = await requireAuth(["SUPER_ADMIN", "APPROVER"]);
  const disbursementId = formData.get("disbursementId") as string;

  const disb = await db.disbursement.findUnique({
    where: { id: disbursementId },
    include: { program: true },
  });

  if (!disb) {
    throw new Error("Pengajuan penyaluran tidak ditemukan.");
  }

  await db.disbursement.update({
    where: { id: disbursementId },
    data: {
      status: "POSTED",
      approvedBy: session.email,
      postedAt: new Date(),
    },
  });

  await db.auditLog.create({
    data: {
      actorId: session.userId,
      action: "DISBURSEMENT_POSTED",
      entity: "Disbursement",
      entityId: disbursementId,
      details: `Penyaluran Rp ${disb.amount.toLocaleString("id-ID")} untuk ${disb.program.title} disetujui dan dibukukan (POSTED) oleh ${session.email}`,
    },
  });

  revalidatePath("/admin/penyaluran");
  revalidatePath("/admin");
  revalidatePath("/laporan");
  revalidatePath("/program");
  revalidatePath(`/program/${disb.program.slug}`);
}
