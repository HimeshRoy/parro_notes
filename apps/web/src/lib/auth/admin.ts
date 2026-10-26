import {
  clearAdminSession,
  getAdminToken,
  getStoredAdmin,
} from "@/lib/api";

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken());
}

export function getCurrentAdmin() {
  return getStoredAdmin();
}

export function logoutAdmin() {
  clearAdminSession();
  window.location.replace("/admin-login");
}