// components/SupportClient.tsx
"use client";

import { useEffect } from "react";
import { links } from "@/lib/links";
import StickyCta from "@/components/StickyCta";
import SupportTicketForm from "@/components/SupportTicketForm";

export default function SupportClient() {
  // Portal rules: protected pages except login/register.
  // Subscription purchase + billing management happen inside /billing.
  const portalBilling = "https://portal.ekasibooks.co.za/billing";

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 120));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h1
            className="h1 center reveal"
            style={{
              color: "#fff",
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Support that actually helps
          </h1>

          <p
            className="center reveal"
            style={{
              color: "#e7f3f4",
              fontSize: 18,
              maxWidth: 840,
              marginInline: "auto",
              marginTop: 0,
            }}
          >
            Billing, backups, templates, VAT — whatever you’re stuck on, we’ll point you in the right direction.
          </p>

          {/* Hero CTAs */}
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 26,
            }}
          >
            <a
              href={links.download}
              style={{
                borderRadius: 999,
                padding: "14px 20px",
                fontWeight: 950,
                textDecoration: "none",
                background: "#fff",
                color: "var(--brand-700)",
                border: "1px solid rgba(255,255,255,.25)",
                boxShadow: "0 12px 28px rgba(0,0,0,.18)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              Download the app
            </a>

            <a
              href={portalBilling}
              style={{
                borderRadius: 999,
                padding: "14px 20px",
                fontWeight: 950,
                textDecoration: "none",
                background: "rgba(255,255,255,.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.25)",
                backdropFilter: "blur(10px)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              Manage billing
            </a>

            <a
              href="mailto:support@ekasibooks.co.za?subject=eKasiBooks%20Support%20Request"
              style={{
                borderRadius: 999,
                padding: "14px 20px",
                fontWeight: 950,
                textDecoration: "none",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.35)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              Email Support
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 18,
              flexWrap: "wrap",
              marginTop: 18,
              color: "rgba(255,255,255,.85)",
              fontSize: 14,
            }}
          >
            <span>✅ Mon–Fri 09:00–17:00 SAST</span>
            <span>✅ “We aim to reply within 1 business day”</span>
            <span>✅ Screenshots help faster</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          {/* TOP GRID */}
          <div
            className="supportGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 32,
              alignItems: "stretch",
            }}
          >
            {/* CONTACT / QUICK HELP */}
            <div className="card reveal" style={{ padding: 32 }}>
              <h2 className="h3" style={{ marginBottom: 10 }}>
                Contact support
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                <div
                  className="thinCard"
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    border: "1px solid var(--ring)",
                    background: "#fff",
                  }}
                >
                  <strong>Email</strong>
                  <p style={{ margin: "8px 0 0" }}>
                    <a
                      href="mailto:support@ekasibooks.co.za"
                      style={{
                        color: "var(--brand)",
                        fontWeight: 950,
                        textDecoration: "none",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        display: "inline-block",
                      }}
                    >
                      support@ekasibooks.co.za
                    </a>
                  </p>
                  <p className="muted" style={{ margin: "8px 0 0", fontSize: 13 }}>
                    Best for screenshots
                  </p>
                </div>

                <div
                  className="thinCard"
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    border: "1px solid var(--ring)",
                    background: "#fff",
                  }}
                >
                  <strong>Hours</strong>
                  <p className="muted" style={{ margin: "8px 0 0" }}>
                    Mon–Fri, 09:00–17:00
                  </p>
                  <p className="muted" style={{ margin: "8px 0 0", fontSize: 13 }}>
                    SAST (South Africa)
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: 22,
                  background: "var(--card)",
                  border: "1px solid var(--ring)",
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <h3 className="h3" style={{ marginBottom: 8 }}>
                  Before you contact us
                </h3>
                <p className="muted" style={{ marginTop: 0, marginBottom: 10 }}>
                  Include these and we’ll solve it faster:
                </p>
                <ul style={{ paddingLeft: 18, color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>
                  <li>Your eKasiBooks version (Settings → About)</li>
                  <li>A screenshot of the issue (if possible)</li>
                  <li>What you expected vs what happened</li>
                </ul>
              </div>

              <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={links.download}
                  style={{
                    borderRadius: 999,
                    padding: "12px 18px",
                    background: "#fff",
                    border: "1px solid #d9e4f2",
                    color: "#0d2030",
                    fontWeight: 950,
                    textDecoration: "none",
                  }}
                >
                  Download the app
                </a>
                <a
                  href={portalBilling}
                  style={{
                    borderRadius: 999,
                    padding: "12px 18px",
                    background: "var(--brand)",
                    border: "1px solid rgba(0,0,0,.06)",
                    color: "#fff",
                    fontWeight: 950,
                    textDecoration: "none",
                  }}
                >
                  Manage billing
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="card reveal" style={{ padding: 32 }}>
              <h2 className="h3" style={{ marginBottom: 10 }}>
                FAQs
              </h2>

              <details>
                <summary>Does eKasiBooks work offline?</summary>
                <p>
                  Yes — once you’re signed in, you can quote and invoice without internet. You’ll need a connection to sign in again if you log out.
                </p>
              </details>

              <details>
                <summary>Can I add my logo?</summary>
                <p>Add your logo, company details and VAT information.</p>
              </details>

              <details>
                <summary>How do I backup?</summary>
                <p>Use the Export/Backup option in the app to save a copy of your data.</p>
              </details>

              <details>
                <summary>Where do I manage my subscription?</summary>
                <p>In your dashboard under Billing. Your Pro status updates automatically.</p>
              </details>

              <details>
                <summary>I need help urgently — what should I send?</summary>
                <p>Your app version, a screenshot, and the steps you took. That’s usually enough to troubleshoot quickly.</p>
              </details>
            </div>
          </div>

          {/* TICKET */}
          <div className="section reveal" style={{ paddingTop: 48 }}>
            <div className="card" style={{ padding: 40, position: "relative", overflow: "hidden" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -2,
                  background:
                    "radial-gradient(600px 260px at 10% 0%, rgba(33,93,99,.10), transparent 60%), radial-gradient(600px 260px at 90% 20%, rgba(28,79,84,.10), transparent 65%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative" }}>
                <h2 className="h3">Send a support request</h2>
                <p className="muted" style={{ marginTop: 10, marginBottom: 24 }}>
                  Fill in the form and we’ll get back to you by email.
                </p>

                <SupportTicketForm />

                <p className="muted" style={{ marginTop: 18, fontSize: 13 }}>
                  Tip: Include your app version and a screenshot for faster help.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIONS */}
          <style>{`
            .reveal { opacity: 0; transform: translateY(20px); transition: all .6s ease; }
            .reveal.show { opacity: 1; transform: translateY(0); }

            .card { transition: transform .25s ease, box-shadow .25s ease; }
            .card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(10,37,64,.12); }

            details {
              margin-top: 14px;
              border: 1px solid rgba(0,0,0,.06);
              border-radius: 12px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0 8px 22px rgba(10,37,64,.06);
            }
            details:first-of-type { margin-top: 0; }
            details > summary {
              padding: 14px 16px;
              cursor: pointer;
              font-weight: 900;
              list-style: none;
            }
            details > summary::-webkit-details-marker { display: none; }
            details > summary:before {
              content: "▸";
              display: inline-block;
              margin-right: 10px;
              transform: translateY(-1px);
              transition: transform .2s ease;
              color: var(--brand);
              font-weight: 950;
            }
            details[open] > summary:before { transform: rotate(90deg) translateY(-1px); }
            details p { margin: 0; padding: 0 16px 16px; }

            @media (max-width: 992px){
              .supportGrid{ grid-template-columns: 1fr !important; gap: 24px !important; }
              .h1{ font-size: 40px !important; }
            }
          `}</style>
        </div>
      </section>

      <StickyCta
        primaryHref={portalBilling}
        primaryLabel="Manage billing"
        secondaryHref={portalBilling}
        secondaryLabel="Upgrade to Pro"
      />
    </main>
  );
}
