import { Role } from "@prisma/client";

export const ROLES_ORDER: Role[] = ["MEMBER", "CLUB_MEMBER", "CLUB_ADMIN", "SUPER_ADMIN"];

export function hasMinimumRole(userRole: Role, required: Role): boolean {
  return ROLES_ORDER.indexOf(userRole) >= ROLES_ORDER.indexOf(required);
}

export function canAccessDashboard(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_MEMBER");
}

export function canManageEvents(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_MEMBER");
}

export function canManageAllEvents(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_ADMIN");
}

export function canViewContactSubmissions(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_MEMBER");
}

export function canManageUsers(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_ADMIN");
}

export function canManageRoles(role: Role): boolean {
  return hasMinimumRole(role, "SUPER_ADMIN");
}

export function canDeleteEvent(role: Role): boolean {
  return hasMinimumRole(role, "CLUB_ADMIN");
}

export function roleLabel(role: Role): string {
  switch (role) {
    case "MEMBER":
      return "Member";
    case "CLUB_MEMBER":
      return "Club Member";
    case "CLUB_ADMIN":
      return "Club Admin";
    case "SUPER_ADMIN":
      return "Super Admin";
    default:
      return role;
  }
}
