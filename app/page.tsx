// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "eKasiBooks – Simple Accounting & Invoicing Software for Small Businesses",
  description:
    "Create branded quotes and invoices, track payments, and send statements in minutes. eKasiBooks is offline-first accounting software built for small businesses in South Africa.",
  alternates: {
    canonical: "https://ekasibooks.co.za/",
  },
  openGraph: {
    title: "eKasiBooks – Simple Accounting & Invoicing Software",
    description:
      "Offline-first accounting & invoicing for small businesses in South Africa. Look professional, bill faster, get paid.",
    url: "https://ekasibooks.co.za/",
    siteName: "eKasiBooks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eKasiBooks – Simple Accounting & Invoicing Software",
    description:
      "Create invoices, track payments, and send statements fast. Offline-first and built for small businesses.",
  },
};

export default function Page() {
  return <HomeClient />;
}
