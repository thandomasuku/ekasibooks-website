// app/terms/page.tsx
import StickyCta from "@/components/StickyCta";
import { links } from "@/lib/links";

export default function TermsPage() {
  const updated = "13 Jan 2026"; // change anytime

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(900px 500px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h1 className="h1 center" style={{ color: "#fff" }}>
            Terms &amp; Conditions
          </h1>
          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 14,
              fontSize: 16,
              maxWidth: 860,
              marginInline: "auto",
            }}
          >
            These terms govern your use of eKasiBooks, including the website, desktop app, and subscription services.
          </p>

          <p className="center" style={{ color: "rgba(255,255,255,.85)", marginTop: 12, fontWeight: 800 }}>
            Last updated: {updated}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="card" style={{ padding: 40 }}>
            <h2 className="h2" style={{ marginTop: 0 }}>
              1. About eKasiBooks
            </h2>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              eKasiBooks is a desktop-first billing and invoicing application. The website provides product information,
              downloads, and access to subscription management.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">2. Eligibility</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              You must be able to enter into a legally binding agreement to use eKasiBooks. If you are using eKasiBooks
              on behalf of a business, you confirm you have authority to bind that business to these terms.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">3. Licence and acceptable use</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>
                <strong>Licence:</strong> We grant you a non-exclusive, non-transferable licence to use eKasiBooks in
                accordance with these terms.
              </li>
              <li>
                <strong>Restrictions:</strong> You may not reverse engineer, resell, or distribute the app except where
                permitted by law or with written permission.
              </li>
              <li>
                <strong>Abuse:</strong> You may not misuse the service (e.g., attempt unauthorized access, interfere with
                systems, or use it for unlawful activities).
              </li>
            </ul>

            <div style={{ height: 18 }} />

            <h3 className="h3">4. Trial and Pro subscription</h3>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.85 }}>
              <li>
                <strong>Trial:</strong> Trial access may be limited by document count in the desktop app.
              </li>
              <li>
                <strong>Pro:</strong> Pro is a paid subscription that unlocks additional features such as unlimited usage
                (where applicable) and priority support.
              </li>
              <li>
                <strong>Billing:</strong> Subscription billing is processed by a third-party payment provider. Your Pro
                status updates based on payment/subscription events.
              </li>
              <li>
                <strong>Cancellation:</strong> You can cancel at any time from your billing dashboard. Service access may
                continue until the end of the billing period depending on your provider’s rules.
              </li>
            </ul>

            <div style={{ height: 18 }} />

            <h3 className="h3">5. Your data &amp; backups</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              Your operational records (quotes, invoices, customers, statements) are stored locally by the desktop app.
              You are responsible for maintaining backups. eKasiBooks provides backup/export tools, but you should keep
              copies in a safe place.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">6. Support</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              Support is provided via our support channels and may vary by plan. For fastest service, include your app
              version and screenshots where possible.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">7. Updates and changes</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              We may release updates or improvements to eKasiBooks. Some updates may be required for security or
              compatibility. We may modify these terms from time to time; continued use means you accept the updated
              terms.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">8. Disclaimer</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              eKasiBooks is provided “as is” and “as available”. While we work hard to keep things stable, we do not
              guarantee uninterrupted or error-free operation. You are responsible for reviewing and verifying your
              outputs (including tax/VAT figures) before submission or use.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">9. Limitation of liability</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              To the maximum extent permitted by law, eKasiBooks and its operators will not be liable for indirect,
              incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or
              goodwill arising from your use of the product.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">10. Termination</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              We may suspend or terminate access if these terms are breached or if required to protect the service and
              users. You may stop using eKasiBooks at any time.
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">11. Governing law</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              These terms are governed by the laws of South Africa (unless otherwise required by applicable law).
            </p>

            <div style={{ height: 18 }} />

            <h3 className="h3">12. Contact</h3>
            <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>
              Questions about these terms? Email{" "}
              <a href="mailto:sales@ekasibooks.co.za" style={{ fontWeight: 900 }}>
                sales@ekasibooks.co.za
              </a>{" "}
              or visit our{" "}
              <a href={links.support} style={{ fontWeight: 900 }}>
                Support
              </a>{" "}
              page.
            </p>

            <div style={{ height: 18 }} />

            <div
              className="thinCard"
              style={{
                padding: 18,
                borderRadius: 16,
                background: "var(--card)",
                border: "1px solid var(--ring)",
              }}
            >
              <strong>Related pages</strong>
              <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
                Review our{" "}
                <a href="/privacy" style={{ fontWeight: 900 }}>
                  Privacy Policy
                </a>{" "}
                as well.
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
        secondaryHref={links.pricing}
        secondaryLabel="See Pricing"
      />
    </main>
  );
}
