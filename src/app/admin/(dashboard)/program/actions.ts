"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function createProgramAction(formData: FormData) {
  const session = await requireAuth(["SUPER_ADMIN", "ADMIN_PROGRAM"]);

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string).toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
  const categoryId = formData.get("categoryId") as string;
  const targetAmount = parseInt(formData.get("targetAmount") as string, 10) || 0;
  const summary = formData.get("summary") as string;
  const body = formData.get("body") as string;
  const beneficiaryDescription = (formData.get("beneficiaryDescription") as string) || null;
  const usageOfFunds = (formData.get("usageOfFunds") as string) || null;
  const locationLabel = (formData.get("locationLabel") as string) || null;
  const isFeatured = formData.get("isFeatured") === "on";
  const status = formData.get("status") as string || "DRAFT";

  if (!title || !slug || !categoryId || !summary || !body) {
    throw new Error("Field wajib belum terisi lengkap.");
  }

  const existing = await db.program.findUnique({ where: { slug } });
  if (existing) {
    throw new Error(`Slug '${slug}' sudah digunakan oleh program lain.`);
  }

  await db.program.create({
    data: {
      title,
      slug,
      categoryId,
      targetAmount,
      summary,
      body,
      beneficiaryDescription,
      usageOfFunds,
      locationLabel,
      isFeatured,
      status,
      coverImage: "/brand/ar-rahmah-care.jpg",
    },
  });

  await db.auditLog.create({
    data: {
      actorId: session.userId,
      action: "PROGRAM_CREATED",
      entity: "Program",
      entityId: slug,
      details: `Program baru '${title}' dibuat dengan status ${status}`,
    },
  });

  revalidatePath("/program");
  revalidatePath("/admin/program");
  redirect("/admin/program");
}
