export interface AdminSession {
  role: 'superadmin' | 'admin';
  districtId?: string;
  displayName: string;
  officeLabel: string;
}

export type AdminCredential = AdminSession & { email: string; password: string };

export const ADMIN_CREDENTIALS: AdminCredential[] = [
  {
    email: 'superadmin@abvpdeogiri.org',
    password: 'super123',
    role: 'superadmin',
    displayName: 'Super Administrator',
    officeLabel: 'State IT Command Cell',
  },
  {
    email: 'sambhajinagar.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'sambhajinagar',
    displayName: 'Sambhajinagar Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'beed.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'beed',
    displayName: 'Beed Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'nanded.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'nanded',
    displayName: 'Nanded Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'latur.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'latur',
    displayName: 'Latur Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'dharashiv.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'dharashiv',
    displayName: 'Dharashiv Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'jalna.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'jalna',
    displayName: 'Jalna Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'parbhani.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'parbhani',
    displayName: 'Parbhani Admin',
    officeLabel: 'District Console',
  },
  {
    email: 'hingoli.admin@abvpdeogiri.org',
    password: 'admin123',
    role: 'admin',
    districtId: 'hingoli',
    displayName: 'Hingoli Admin',
    officeLabel: 'District Console',
  },
];

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}

function normalizePassword(value: string): string {
  return value.trim();
}

function emailMatches(credentialEmail: string, inputEmail: string): boolean {
  if (credentialEmail === inputEmail) return true;

  const hyphenVariant = credentialEmail.replace('@abvpdeogiri.org', '@abvp-deogiri.org');
  if (hyphenVariant === inputEmail) return true;

  const dehyphenVariant = inputEmail.replace('@abvp-deogiri.org', '@abvpdeogiri.org');
  return credentialEmail === dehyphenVariant;
}

export function matchAdminCredential(rawEmail: string, rawPassword: string): AdminCredential | undefined {
  const email = normalizeEmail(rawEmail);
  const password = normalizePassword(rawPassword);

  if (!email || !password) return undefined;

  return ADMIN_CREDENTIALS.find(
    cred => emailMatches(cred.email.toLowerCase(), email) && cred.password === password
  );
}
