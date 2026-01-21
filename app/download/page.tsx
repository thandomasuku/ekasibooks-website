// app/download/page.tsx
import type { Metadata } from "next";
import DownloadClient from "@/components/DownloadClient";

export const metadata: Metadata = {
  title: "Download – eKasiBooks Desktop App (Windows & macOS)",
  description:
    "Download the eKasiBooks desktop invoicing app for Windows 10/11 and macOS 12+. Install once, work offline, and generate branded PDFs for quotes and invoices.",
  alternates: {
    canonical: "https://ekasibooks.co.za/download",
  },
  openGraph: {
    title: "Download eKasiBooks – Windows & macOS",
    description:
      "Install once. Work offline. Look professional. Download eKasiBooks for Windows 10/11 and macOS 12+.",
    url: "https://ekasibooks.co.za/download",
    siteName: "eKasiBooks",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download eKasiBooks",
    description:
      "Download the eKasiBooks desktop app for Windows and macOS. Offline-first invoicing with branded PDFs.",
  },
};

export default function DownloadPage() {
  return <DownloadClient />;
}
