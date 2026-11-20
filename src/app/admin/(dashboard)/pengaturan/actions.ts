"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function updateOrganizationSettingsAction(formData: FormData) {
  const session = await requireAuth(["SUPER_ADMIN"]);

  const organizationName = formData.get("organizationName") as string;
  const tagline = formData.get("tagline") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const legalDisclosure = formData.get("legalDisclosure") as string;
  const verifiedBankName = formData.get("verifiedBankName") as string;
  const verifiedAccountName = formData.get("verifiedAccountName") as string;
  const verifiedAccountNo = formData.get("verifiedAccountNo") as string;
  const featureZakat = formData.get("featureZakat") === "on";
  const featureWakaf = formData.get("featureWakaf") === "on";
  const featureQurban = formData.get("featureQurban") === "on";
  const demoMode = formData.get("demoMode") === "on";

  await db.organizationSetting.upsert({
    where: { id: "default" },
    update: {
      organizationName,
      tagline,
      address,
      email,
      phone,
      whatsapp,
      legalDisclosure,
      verifiedBankName,
      verifiedAccountName,
      verifiedAccountNo,
      featureZakat,
      featureWakaf,
      featureQurban,
      demoMode,
    },
    create: {
      id: "default",
      organizationName,
      tagline,
      address,
      email,
      phone,
      whatsapp,
      legalDisclosure,
      verifiedBankName,
      verifiedAccountName,
      verifiedAccountNo,
      featureZakat,
      featureWakaf,
      featureQurban,
      demoMode,
    },
  });

  await db.auditLog.create({
    data: {
      actorId: session.userId,
      action: "ORGANIZATION_SETTINGS_UPDATED",
      entity: "OrganizationSetting",
      entityId: "default",
      details: `Pengaturan lembaga diperbarui oleh ${session.email}. DemoMode: ${demoMode}`,
    },
  });

  revalidatePath("/");
  revalidatePath("/kontak");
  revalidatePath("/tentang");
  revalidatePath("/admin/pengaturan");
}
