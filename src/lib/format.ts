/**
 * Utility formatting functions for currency, dates (WITA / Asia/Makassar), numbers, and privacy masking
 */

export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (isNaN(num) || num === null || num === undefined) {
    return "0";
  }
  return new Intl.NumberFormat("id-ID").format(num);
}

/**
 * Format date in WITA (Asia/Makassar, UTC+8)
 */
export function formatDateTimeWita(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d) + " WITA";
}

export function formatDateWita(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    dateStyle: "medium",
  }).format(d);
}

/**
 * Mask sensitive data for privacy (e.g. 081234567890 -> 0812****7890, user@mail.com -> u***@mail.com)
 */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "-";
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.length < 7) return "***";
  return cleaned.slice(0, 4) + "****" + cleaned.slice(-3);
}

export function maskEmail(email: string | null | undefined): string {
  if (!email) return "-";
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const [user, domain] = parts;
  const maskedUser = user.length > 2 ? user[0] + "***" + user.slice(-1) : user[0] + "***";
  return `${maskedUser}@${domain}`;
}

export function maskDonorName(name: string | null | undefined, isAnonymous: boolean): string {
  if (isAnonymous || !name || name.trim().toLowerCase() === "hamba allah") {
    return "Hamba Allah";
  }
  return name;
}
