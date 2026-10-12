export const ADMIN_EMAILS: string[] = [
  "amanmauryaji16@gmail.com",
  "amanmauryaji24@gmail.com",
  "apmauryaji16@gmail.com"
];

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === normalized);
}
