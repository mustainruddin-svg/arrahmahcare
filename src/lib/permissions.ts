export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN_PROGRAM"
  | "FINANCE"
  | "APPROVER"
  | "EDITOR"
  | "VIEWER";

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Administrator",
  ADMIN_PROGRAM: "Admin Program",
  FINANCE: "Bendahara / Finance",
  APPROVER: "Dewan Pengawas / Approver",
  EDITOR: "Redaksi / Editor",
  VIEWER: "Staff Viewer",
};

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: [
    "dashboard:view",
    "programs:view",
    "programs:edit",
    "donations:view",
    "donations:verify",
    "donors:view",
    "disbursements:view",
    "disbursements:create",
    "disbursements:approve",
    "reports:view",
    "reports:edit",
    "articles:view",
    "articles:edit",
    "impact:view",
    "impact:edit",
    "settings:edit",
    "users:manage",
    "audit:view",
  ],
  ADMIN_PROGRAM: [
    "dashboard:view",
    "programs:view",
    "programs:edit",
    "donations:view",
    "disbursements:view",
    "disbursements:create",
    "articles:view",
    "articles:edit",
    "impact:view",
    "impact:edit",
  ],
  FINANCE: [
    "dashboard:view",
    "donations:view",
    "donations:verify",
    "donors:view",
    "disbursements:view",
    "disbursements:create",
    "reports:view",
    "reports:edit",
  ],
  APPROVER: [
    "dashboard:view",
    "programs:view",
    "donations:view",
    "disbursements:view",
    "disbursements:approve",
    "reports:view",
    "audit:view",
  ],
  EDITOR: [
    "dashboard:view",
    "articles:view",
    "articles:edit",
    "impact:view",
    "impact:edit",
  ],
  VIEWER: [
    "dashboard:view",
    "programs:view",
    "donations:view",
    "reports:view",
  ],
};

export function hasPermission(role: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
