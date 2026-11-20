import { db } from "@/lib/db";

export interface GlobalImpactStats {
  totalCollected: number;
  totalDisbursed: number;
  remainingBalance: number;
  totalBeneficiaries: number;
  activeProgramsCount: number;
  totalDonorsCount: number;
  lastUpdatedAt: Date;
}

export interface ProgramStats {
  programId: string;
  collectedAmount: number;
  disbursedAmount: number;
  remainingAmount: number;
  donationsCount: number;
  progressPercent: number;
}

/**
 * Calculate verified global impact stats strictly from database ledgers
 */
export async function getGlobalImpactStats(): Promise<GlobalImpactStats> {
  const [collectedAgg, disbursedAgg, activeProgramsCount, donorsCount] = await Promise.all([
    // Only PAID donations count!
    db.donation.aggregate({
      _sum: { amount: true },
      where: { status: "PAID" },
    }),
    // Only POSTED disbursements count!
    db.disbursement.aggregate({
      _sum: {
        amount: true,
        beneficiaryCount: true,
      },
      where: { status: "POSTED" },
    }),
    db.program.count({
      where: { status: "PUBLISHED" },
    }),
    db.donor.count(),
  ]);

  const totalCollected = collectedAgg._sum.amount || 0;
  const totalDisbursed = disbursedAgg._sum.amount || 0;
  const remainingBalance = Math.max(0, totalCollected - totalDisbursed);
  const totalBeneficiaries = disbursedAgg._sum.beneficiaryCount || 0;

  return {
    totalCollected,
    totalDisbursed,
    remainingBalance,
    totalBeneficiaries,
    activeProgramsCount,
    totalDonorsCount: donorsCount,
    lastUpdatedAt: new Date(),
  };
}

/**
 * Calculate financial metrics for a single program
 */
export async function getProgramStats(programId: string, targetAmount: number): Promise<ProgramStats> {
  const [collectedAgg, disbursedAgg, donationsCount] = await Promise.all([
    db.donation.aggregate({
      _sum: { amount: true },
      where: {
        programId,
        status: "PAID",
      },
    }),
    db.disbursement.aggregate({
      _sum: { amount: true },
      where: {
        programId,
        status: "POSTED",
      },
    }),
    db.donation.count({
      where: {
        programId,
        status: "PAID",
      },
    }),
  ]);

  const collectedAmount = collectedAgg._sum.amount || 0;
  const disbursedAmount = disbursedAgg._sum.amount || 0;
  const remainingAmount = Math.max(0, collectedAmount - disbursedAmount);

  let progressPercent = 0;
  if (targetAmount > 0) {
    progressPercent = Math.min(100, Math.round((collectedAmount / targetAmount) * 100));
  }

  return {
    programId,
    collectedAmount,
    disbursedAmount,
    remainingAmount,
    donationsCount,
    progressPercent,
  };
}
