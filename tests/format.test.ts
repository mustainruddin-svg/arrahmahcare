import { describe, it, expect } from "vitest";
import { formatRupiah, formatNumber, maskPhone, maskEmail, maskDonorName } from "../src/lib/format";

describe("Formatting Utilities", () => {
  it("formats Indonesian Rupiah properly without decimals", () => {
    expect(formatRupiah(150000)).toMatch(/Rp\s*150\.000/);
    expect(formatRupiah(0)).toMatch(/Rp\s*0/);
    expect(formatRupiah(2500000)).toMatch(/Rp\s*2\.500\.000/);
  });

  it("formats numbers with id-ID thousand separators", () => {
    expect(formatNumber(1250)).toBe("1.250");
    expect(formatNumber(1000000)).toBe("1.000.000");
  });

  it("masks phone numbers properly for privacy", () => {
    expect(maskPhone("081234567890")).toBe("0812****890");
    expect(maskPhone(null)).toBe("-");
  });

  it("masks email addresses properly for privacy", () => {
    expect(maskEmail("donatur@example.com")).toBe("d***r@example.com");
    expect(maskEmail(null)).toBe("-");
  });

  it("respects anonymous donor settings", () => {
    expect(maskDonorName("Ahmad Fauzan", true)).toBe("Hamba Allah");
    expect(maskDonorName("Ahmad Fauzan", false)).toBe("Ahmad Fauzan");
    expect(maskDonorName("", false)).toBe("Hamba Allah");
  });
});
