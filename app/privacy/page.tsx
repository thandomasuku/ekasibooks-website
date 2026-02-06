// app/privacy/page.tsx
import StickyCta from "@/components/StickyCta";
import { links } from "@/lib/links";

export default function PrivacyPage() {
  const updated = "13 Jan 2026"; // change anytime

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 280, // ↓ was 320
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(900px 500px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h1 className="h1 center" style={{ color: "#fff" }}>
            Privacy Policy
          </h1>
          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 12, // ↓ was 14
              fontSize: 16,
              lineHeight: 1.65,
              maxWidth: 820,
              marginInline: "auto",
            }}
          >
            We respect your privacy. This policy explains what we collect, why we collect it, and how you can contact us
            about your data.
          </p>

          <p className="center" style={{ color: "rgba(255,255,255,.85)", marginTop: 10, fontWeight: 800 }}>
            Last updated: {updated}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="card" style={{ padding: 32 }}>
            <h2 className="h2" style={{ marginTop: 0 }}>
              Overview
            </h2>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              eKasiBooks is desktop-first. Your business data is primarily stored locally on your device. Some features
              (like account login, subscription billing, and email sending) may require online services.
            </p>

            <div style={{ height: 14 }} />

            <h3 className="h3">What information we collect</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>
                <strong>Account details:</strong> name, email address, and authentication details (for login/OTP where
                applicable).
              </li>
              <li>
                <strong>Billing details:</strong> subscription status and payment references from our payment provider
                (we do not store full card details).
              </li>
              <li>
                <strong>Support requests:</strong> messages you send to support, and any attachments/screenshots you
                include.
              </li>
              <li>
                <strong>Basic technical data:</strong> device/app info used for troubleshooting (e.g., app version).
              </li>
            </ul>

            <div style={{ height: 14 }} />

            <h3 className="h3">What we don’t do</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>We don’t sell your personal data.</li>
              <li>We don’t force your accounting data into the cloud.</li>
              <li>We don’t store your full payment card details.</li>
            </ul>

            <div style={{ height: 14 }} />

            <h3 className="h3">How we use information</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>To create and manage your account and subscription.</li>
              <li>To provide core services (downloads, upgrades, billing access).</li>
              <li>To respond to support requests and improve product reliability.</li>
              <li>To prevent fraud and protect our systems.</li>
            </ul>

            <div style={{ height: 14 }} />

            <h3 className="h3">Data storage and security</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              Your operational data (quotes, invoices, statements, customers) is stored locally by the desktop app. We
              recommend using the built-in backup feature and keeping backups in a safe location. For online services
              (login/billing), we use reputable providers and standard security practices.
            </p>

            <div style={{ height: 14 }} />

            <h3 className="h3">Third-party services</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              We may use third-party services for payments, email delivery, and hosting. These providers process data
              only to deliver their services (e.g., subscription activation).
            </p>

            <div style={{ height: 14 }} />

            <h3 className="h3">Your choices</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>You can request a copy of your account information.</li>
              <li>You can request correction of inaccurate information.</li>
              <li>
                You can request deletion of your account data where applicable (legal/billing requirements may apply).
              </li>
            </ul>

            <div style={{ height: 14 }} />

            <h3 className="h3">Contact us</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              For privacy questions, contact{" "}
              <a href="mailto:support@ekasibooks.co.za" style={{ fontWeight: 900 }}>
                support@ekasibooks.co.za
              </a>
              .
            </p>

            <div style={{ height: 14 }} />

            <div
              className="thinCard"
              style={{
                padding: 16, // ↓ was 18
                borderRadius: 16,
                background: "var(--card)",
                border: "1px solid var(--ring)",
              }}
            >
              <strong>Related pages</strong>
              <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
                Also review our{" "}
                <a href="/terms" style={{ fontWeight: 900 }}>
                  Terms
                </a>{" "}
                and{" "}
                <a href={links.support} style={{ fontWeight: 900 }}>
                  Support
                </a>{" "}
                information.
              </p>
            </div>

            <style>{`
              .card, .thinCard {
                transition: transform .25s ease, box-shadow .25s ease;
              }
              .card:hover {
                transform: translateY(-3px);
                box-shadow: 0 18px 40px rgba(10,37,64,.12);
              }
              a {
                color: var(--brand);
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            `}</style>
          </div>
        </div>
      </section>

      <StickyCta
        primaryHref={links.download}
        primaryLabel="Download eKasiBooks"
        secondaryHref={links.support}
        secondaryLabel="Get Support"
      />
    </main>
  );
}
