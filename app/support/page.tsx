// app/support/page.tsx
import type { Metadata } from "next";
import SupportClient from "@/components/SupportClient";

const SITE = "https://ekasibooks.co.za";

export const metadata: Metadata = {
  title: "Support – eKasiBooks Help, Billing & Troubleshooting",
  description:
    "Get help with eKasiBooks: billing and subscriptions, backups, templates, VAT setup, and troubleshooting. Email support or submit a ticket for assistance.",
  alternates: {
    canonical: `${SITE}/support`,
  },
  openGraph: {
    title: "eKasiBooks Support",
    description:
      "Billing, backups, templates, VAT — get help fast. Email support or submit a ticket.",
    url: `${SITE}/support`,
    siteName: "eKasiBooks",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "eKasiBooks Support",
    description:
      "Need help with billing, VAT, backups or templates? Contact eKasiBooks support.",
  },
};

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "eKasiBooks",
        url: SITE,
      },
      {
        "@type": "WebPage",
        name: "Support – eKasiBooks",
        url: `${SITE}/support`,
        description:
          "Support page for eKasiBooks covering billing, backups, templates, VAT setup, and troubleshooting.",
        isPartOf: { "@id": `${SITE}#website` },
      },
      {
        "@type": "SoftwareApplication",
        name: "eKasiBooks",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows, macOS",
        offers: {
          "@type": "Offer",
          price: "199",
          priceCurrency: "ZAR",
          category: "subscription",
        },
      },
      {
        "@type": "Organization",
        name: "eKasiBooks",
        url: SITE,
        email: "support@ekasibooks.co.za",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@ekasibooks.co.za",
            availableLanguage: ["en"],
            hoursAvailable: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SupportClient />
    </>
  );
}
