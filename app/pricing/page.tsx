// app/pricing/page.tsx
import type { Metadata } from "next";
import PricingClient from "@/components/PricingClient";

export const metadata: Metadata = {
  title: "Pricing – Simple Accounting & Invoicing Software",
  description:
    "eKasiBooks pricing: start on Trial (document-limit based) and upgrade to Pro for R199/month. Offline-first accounting and invoicing for small businesses in South Africa.",
  alternates: {
    canonical: "https://ekasibooks.co.za/pricing",
  },
  openGraph: {
    title: "Pricing – eKasiBooks",
    description:
      "Start on Trial and upgrade to Pro for R199/month. Manage billing via Paystack and keep working offline.",
    url: "https://ekasibooks.co.za/pricing",
    siteName: "eKasiBooks",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing – eKasiBooks",
    description:
      "Start on Trial and upgrade to Pro for R199/month. Offline-first invoicing and accounting for small businesses.",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
