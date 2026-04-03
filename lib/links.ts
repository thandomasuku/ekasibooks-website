// lib/links.ts

// Portal is live
const PORTAL_LIVE = true;

// Base URLs (single source of truth)
const MARKETING_BASE = "";
const PORTAL_BASE = "https://portal.ekasibooks.co.za";

export const links = {
  // ─────────────────────────────
  // Marketing pages
  // ─────────────────────────────
  home: `${MARKETING_BASE}/`,
  features: `${MARKETING_BASE}/features`,
  pricing: `${MARKETING_BASE}/pricing`,
  support: `${MARKETING_BASE}/support`,
  download: `${MARKETING_BASE}/download`,
  contact: `${MARKETING_BASE}/contact`,

  // Optional anchor
  homeFeatures: `${MARKETING_BASE}/#features`,

  // ─────────────────────────────
  // Portal
  // ─────────────────────────────
  portalRegister: PORTAL_LIVE
    ? `${PORTAL_BASE}/register`
    : "/pricing",

  portalLogin: PORTAL_LIVE
    ? `${PORTAL_BASE}/login`
    : "/pricing",

  portalPricing: PORTAL_LIVE
    ? `${PORTAL_BASE}/pricing`
    : "/pricing",

  portalDashboard: PORTAL_LIVE
    ? `${PORTAL_BASE}/dashboard`
    : "/pricing",
};