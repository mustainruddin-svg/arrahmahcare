import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = loginSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Kombinasi email dan password tidak sesuai atau akun nonaktif." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Kombinasi email dan password tidak sesuai." },
        { status: 401 }
      );
    }

    // Set signed JWT session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    });

    // Log login audit
    await db.auditLog.create({
      data: {
        actorId: user.id,
        action: "ADMIN_LOGIN_SUCCESS",
        entity: "User",
        entityId: user.id,
        details: `Login berhasil untuk ${user.email} (${user.role})`,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
    });
  } catch (err: unknown) {
    console.error("Login error:", err);
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
