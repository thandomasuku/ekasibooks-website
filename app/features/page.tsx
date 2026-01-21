// app/features/page.tsx
import type { Metadata } from "next";
import FeaturesClient from "@/components/FeaturesClient";

export const metadata: Metadata = {
  title: "Features – Accounting & Invoicing Software",
  description:
    "Explore eKasiBooks features: quotes to invoices, customer statements, branded PDF templates, payment tracking, local backups, and offline-first billing for small businesses.",
  alternates: {
    canonical: "https://ekasibooks.co.za/features",
  },
  openGraph: {
    title: "Features – eKasiBooks",
    description:
      "Quotes, invoices, statements, branded PDFs, backups, and offline-first billing — built for small businesses.",
    url: "https://ekasibooks.co.za/features",
    siteName: "eKasiBooks",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features – eKasiBooks",
    description:
      "See everything eKasiBooks includes: invoicing, statements, branded PDFs, backups, and offline-first billing.",
  },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
