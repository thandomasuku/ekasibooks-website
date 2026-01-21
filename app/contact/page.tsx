// app/contact/page.tsx
import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

const SITE = "https://ekasibooks.co.za";

export const metadata: Metadata = {
  title: "Contact eKasiBooks – Sales, Support & WhatsApp",
  description:
    "Contact eKasiBooks for sales, billing, and support. Send a message, email us, or chat on WhatsApp during business hours.",
  alternates: {
    canonical: `${SITE}/contact`,
  },
  openGraph: {
    title: "Contact eKasiBooks",
    description:
      "Sales, billing, and support — send a message or chat on WhatsApp. We usually reply within one business day.",
    url: `${SITE}/contact`,
    siteName: "eKasiBooks",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact eKasiBooks",
    description:
      "Sales, billing, and support — send a message or chat on WhatsApp.",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}#website`,
        name: "eKasiBooks",
        url: SITE,
      },
      {
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
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+27-82-340-3945",
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
      },
      {
        "@type": "ContactPage",
        name: "Contact eKasiBooks",
        url: `${SITE}/contact`,
        description:
          "Contact eKasiBooks for sales, billing, and support. Use email, WhatsApp, or the contact form.",
        isPartOf: { "@id": `${SITE}#website` },
        about: { "@id": `${SITE}#org` },
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
      <ContactClient />
    </>
  );
}
