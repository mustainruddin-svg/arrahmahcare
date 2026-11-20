import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Require authenticated session
    await requireAuth(["SUPER_ADMIN", "FINANCE", "APPROVER"]);

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type") || "donations";

    if (type === "disbursements") {
      const disbursements = await db.disbursement.findMany({
        include: { program: true },
        orderBy: { createdAt: "desc" },
      });

      const rows = [
        ["ID", "Tanggal", "Program", "Kategori", "Nominal", "Penerima Manfaat", "Status", "Diajukan Oleh", "Disetujui Oleh", "Keterangan"],
        ...disbursements.map((d) => [
          d.id,
          d.createdAt.toISOString().slice(0, 10),
          `"${d.program.title.replace(/"/g, '""')}"`,
          `"${d.categoryLabel || "-"}"`,
          d.amount,
          d.beneficiaryCount,
          d.status,
          `"${d.submittedBy}"`,
          `"${d.approvedBy || "-"}"`,
          `"${d.description.replace(/"/g, '""')}"`,
        ]),
      ];

      const csvContent = rows.map((e) => e.join(",")).join("\n");
      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="laporan-penyaluran-${Date.now()}.csv"`,
        },
      });
    } else {
      // Default: donations
      const donations = await db.donation.findMany({
        include: { program: true },
        orderBy: { createdAt: "desc" },
      });

      const rows = [
        ["Order ID", "Tanggal Buat", "Tanggal Bayar", "Program", "Nominal", "Status", "Metode", "Donatur", "Anonim", "Pesan"],
        ...donations.map((d) => [
          d.orderId,
          d.createdAt.toISOString().slice(0, 10),
          d.paidAt ? d.paidAt.toISOString().slice(0, 10) : "-",
          `"${d.program.title.replace(/"/g, '""')}"`,
          d.amount,
          d.status,
          d.paymentMethod,
          `"${(d.isAnonymous ? "Hamba Allah" : d.donorName || "Hamba Allah").replace(/"/g, '""')}"`,
          d.isAnonymous ? "Ya" : "Tidak",
          `"${(d.message || "").replace(/"/g, '""')}"`,
        ]),
      ];

      const csvContent = rows.map((e) => e.join(",")).join("\n");
      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="laporan-donasi-${Date.now()}.csv"`,
        },
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unauthorized or error";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
