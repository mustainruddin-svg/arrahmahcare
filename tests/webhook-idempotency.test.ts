import { describe, it, expect } from "vitest";
import { executeIdempotentPaymentUpdate } from "../src/server/payments/provider";
import { db } from "../src/lib/db";

describe("Webhook Idempotency and Payment State Transitions", () => {
  it("processes a webhook payment update and rejects duplicate event processing idempotently", async () => {
    // 1. Create a dummy test donation in PENDING status
    const program = await db.program.findFirst();
    if (!program) throw new Error("No program found for test");

    const testOrderId = `TEST-IDEMP-${Date.now()}`;
    const donation = await db.donation.create({
      data: {
        orderId: testOrderId,
        programId: program.id,
        amount: 50000,
        status: "PENDING",
        paymentMethod: "mock_qris",
        donorName: "Tester Idempotency",
      },
    });

    const eventId = `evt_test_${testOrderId}`;

    // 2. First webhook call: should mark PAID
    const firstCall = await executeIdempotentPaymentUpdate({
      orderId: testOrderId,
      provider: "mock",
      providerEventId: eventId,
      transactionStatus: "settlement",
      paymentMethod: "mock_qris",
      rawPayload: { test: true },
    });

    expect(firstCall.success).toBe(true);
    expect(firstCall.newStatus).toBe("PAID");
    expect(firstCall.isIdempotentDuplicate).toBe(false);

    // Verify donation in DB
    const checkDb = await db.donation.findUnique({
      where: { id: donation.id },
    });
    expect(checkDb?.status).toBe("PAID");
    expect(checkDb?.paidAt).not.toBeNull();

    // 3. Second identical webhook call: must be ignored idempotently without duplicating
    const secondCall = await executeIdempotentPaymentUpdate({
      orderId: testOrderId,
      provider: "mock",
      providerEventId: eventId,
      transactionStatus: "settlement",
      paymentMethod: "mock_qris",
      rawPayload: { test: true },
    });

    expect(secondCall.success).toBe(true);
    expect(secondCall.isIdempotentDuplicate).toBe(true);
  });
});
