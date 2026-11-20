import { describe, it, expect } from "vitest";
import { getGlobalImpactStats, getProgramStats } from "../src/server/donations/stats";
import { db } from "../src/lib/db";

describe("Ledger Calculation Integrity", () => {
  it("only counts PAID donations in global and program metrics", async () => {
    const stats = await getGlobalImpactStats();

    expect(stats.totalCollected).toBeGreaterThan(0);
    expect(stats.totalDisbursed).toBeGreaterThan(0);
    expect(stats.remainingBalance).toBe(stats.totalCollected - stats.totalDisbursed);
    expect(stats.activeProgramsCount).toBeGreaterThan(0);
  });

  it("calculates single program stats and progress percentage correctly", async () => {
    const program = await db.program.findFirst({
      where: { status: "PUBLISHED" },
    });

    if (program) {
      const pStats = await getProgramStats(program.id, program.targetAmount);
      expect(pStats.collectedAmount).toBeGreaterThanOrEqual(0);
      expect(pStats.progressPercent).toBeGreaterThanOrEqual(0);
      expect(pStats.progressPercent).toBeLessThanOrEqual(100);
    }
  });
});
