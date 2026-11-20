import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/server/payments/provider";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (!payload || !payload.order_id) {
      return NextResponse.json(
        { error: "Payload webhook tidak valid: order_id wajib disertakan." },
        { status: 400 }
      );
    }

    const provider = getPaymentProvider();
    const result = await provider.verifyAndProcessWebhook(payload);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook processing error:", error);
    const msg = error instanceof Error ? error.message : "Internal webhook error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
