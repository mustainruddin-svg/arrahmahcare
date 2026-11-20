import { describe, it, expect } from "vitest";
import { hasPermission } from "../src/lib/permissions";

describe("RBAC Permissions", () => {
  it("grants full permissions to SUPER_ADMIN", () => {
    expect(hasPermission("SUPER_ADMIN", "settings:edit")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "users:manage")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "programs:edit")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "disbursements:approve")).toBe(true);
  });

  it("restricts ADMIN_PROGRAM from modifying settings or approving disbursements", () => {
    expect(hasPermission("ADMIN_PROGRAM", "programs:edit")).toBe(true);
    expect(hasPermission("ADMIN_PROGRAM", "settings:edit")).toBe(false);
    expect(hasPermission("ADMIN_PROGRAM", "disbursements:approve")).toBe(false);
  });

  it("grants financial reconciliation permissions to FINANCE", () => {
    expect(hasPermission("FINANCE", "donations:verify")).toBe(true);
    expect(hasPermission("FINANCE", "reports:edit")).toBe(true);
    expect(hasPermission("FINANCE", "programs:edit")).toBe(false);
  });

  it("allows APPROVER to approve disbursements but not edit settings", () => {
    expect(hasPermission("APPROVER", "disbursements:approve")).toBe(true);
    expect(hasPermission("APPROVER", "settings:edit")).toBe(false);
  });
});
