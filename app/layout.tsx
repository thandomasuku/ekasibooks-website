// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const SITE = "https://ekasibooks.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  title: {
    default: "eKasiBooks – Simple Accounting & Invoicing Software",
    template: "%s | eKasiBooks",
  },

  description:
    "Create branded quotes and invoices, track payments, and send statements in minutes. eKasiBooks is offline-first accounting software built for small businesses in South Africa.",

  // ✅ IMPORTANT: do NOT set a global canonical to "/"
  // Each page should have its own canonical (or rely on defaults if you don’t set one).

  applicationName: "eKasiBooks",
  referrer: "origin-when-cross-origin",

  keywords: [
    "invoicing software",
    "accounting software",
    "quotes and invoices",
    "statements",
    "small business accounting",
    "South Africa invoicing",
    "offline invoicing",
    "VAT invoices",
  ],

  authors: [{ name: "eKasiBooks", url: SITE }],
  creator: "eKasiBooks",
  publisher: "eKasiBooks",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ✅ Add these files in /public when ready:
  // /public/og-image.png  (1200x630)
  // /public/favicon.ico
  // /public/apple-touch-icon.png (180x180)
  // /public/site.webmanifest
icons: {
  icon: "/icon.png",
  apple: "/apple-icon.png", // optional
},
 manifest: "/site.webmanifest", // enable only when the file exists

 openGraph: {
  type: "website",
  url: "/",
  siteName: "eKasiBooks",
  title: "eKasiBooks – Simple Accounting & Invoicing Software",
  description:
    "Offline-first accounting & invoicing for small businesses in South Africa. Look professional, bill faster, get paid.",
  locale: "en_ZA",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "eKasiBooks – Simple Accounting & Invoicing Software",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: "eKasiBooks – Simple Accounting & Invoicing Software",
  description:
    "Create invoices, track payments, and send statements fast. Offline-first and built for small businesses.",
  images: ["/og-image.png"],
},

  category: "Business Software",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}#org`,
    name: "eKasiBooks",
    url: SITE,
    email: "support@ekasibooks.co.za",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@ekasibooks.co.za",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@ekasibooks.co.za",
        availableLanguage: ["en"],
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en-ZA">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
