// app/pricing/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { links } from "@/lib/links";
import StickyCta from "@/components/StickyCta";

type Feature = { label: string; trial: boolean; pro: boolean };

const compare: Feature[] = [
  { label: "Quotes & Invoices", trial: true, pro: true },
  { label: "Statements & Customers", trial: true, pro: true },
  { label: "PDF export", trial: true, pro: true },
  { label: "Unlimited documents", trial: false, pro: true },
  { label: "Email from the app", trial: false, pro: true },
  { label: "Priority support", trial: false, pro: true },
];

function ZoomableImage({
  src,
  alt,
  hint = "Click to zoom (Esc to close)",
}: {
  src: string;
  alt: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    // Prevent background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Zoom image"
        title={hint}
        style={{
          all: "unset",
          cursor: "zoom-in",
          display: "block",
          width: "100%",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="zoomOverlay"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,.72)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            cursor: "zoom-out",
            animation: "zoomFade .14s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 1200,
              width: "min(1200px, 96vw)",
              maxHeight: "92vh",
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 18px 70px rgba(0,0,0,.35)",
              border: "1px solid rgba(255,255,255,.10)",
              display: "grid",
              gridTemplateRows: "auto 1fr",
              cursor: "default",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                borderBottom: "1px solid rgba(0,0,0,.06)",
                background: "#fff",
              }}
            >
              <span style={{ fontWeight: 900, fontSize: 13, color: "#0d2030", opacity: 0.85 }}>{hint}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  border: "1px solid rgba(0,0,0,.10)",
                  background: "#fff",
                  borderRadius: 10,
                  padding: "8px 10px",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ overflow: "auto", background: "#f7f9fc" }}>
              <img
                src={src}
                alt={alt}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PricingCard({
  title,
  price,
  sub,
  badge,
  popular,
  items,
  cta,
  note,
}: {
  title: string;
  price: string;
  sub: string;
  badge?: string;
  popular?: boolean;
  items: Array<string | { strong: string; rest?: string }>;
  cta: React.ReactNode;
  note?: string;
}) {
  return (
    <div
      className="reveal"
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,.06)",
        boxShadow: popular
          ? "0 16px 46px rgba(10,37,64,.14)"
          : "0 10px 32px rgba(10,37,64,.10)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        outline: popular ? "2px solid rgba(33,93,99,.14)" : "none",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
    >
      {/* Badge slot keeps heights aligned */}
      <div style={{ minHeight: 34, display: "flex", alignItems: "center", marginBottom: 10 }}>
        {badge ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: popular ? "var(--brand-700)" : "var(--brand)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 900,
              borderRadius: 999,
              padding: "6px 10px",
              letterSpacing: ".2px",
            }}
          >
            {badge}
          </span>
        ) : (
          <span style={{ visibility: "hidden" }}>ghost</span>
        )}
      </div>

      <h3 className="h3" style={{ marginBottom: 10 }}>
        {title}
      </h3>

      <p style={{ fontSize: 44, fontWeight: 950, color: "var(--brand)", margin: "0 0 2px" }}>{price}</p>
      <p className="muted" style={{ fontSize: 14, margin: "0 0 10px" }}>
        {sub}
      </p>

      <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
        {items.map((it, idx) => {
          if (typeof it === "string") {
            return (
              <li key={idx} style={{ margin: ".25rem 0" }}>
                {it}
              </li>
            );
          }
          return (
            <li key={idx} style={{ margin: ".25rem 0" }}>
              <strong>{it.strong}</strong>
              {it.rest ? ` ${it.rest}` : ""}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: "auto", paddingTop: 18 }}>{cta}</div>

      {note ? (
        <p className="muted" style={{ marginTop: 10, fontSize: 13, marginBottom: 0 }}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

export default function PricingPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 120);
    });
  }, []);

  return (
    <main>
      {/* ✅ HERO SECTION */}
      <section
        style={{
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container reveal" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h1
            className="h1 center"
            style={{
              color: "#fff",
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Simple pricing that grows with your business
          </h1>

          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 0,
              fontSize: 18,
              maxWidth: 780,
              marginInline: "auto",
            }}
          >
            Start on Trial (document-limit based in the desktop app). Upgrade anytime to Pro for unlimited usage.
          </p>

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
              href={links.portalPricing}
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
              Subscribe to Pro
            </a>

            <a
              href={links.download}
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
              Download the app
            </a>
          </div>

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
            <span>✅ Offline-first</span>
            <span>✅ Paystack subscription</span>
            <span>✅ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ✅ REST OF PAGE CONTENT */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          {/* Cards */}
          <div
            className="pricingGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 20,
              alignItems: "stretch",
              marginTop: 28,
            }}
          >
            <PricingCard
              title="Trial"
              price="Free"
              sub="document-limit based • no card required"
              items={[
                "Quotes, Invoices, Statements",
                "Customers & PDF export",
                "Local data (offline-first)",
                "Trial limit applies in the desktop app",
              ]}
              cta={
                <a
                  href={links.download}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    textDecoration: "none",
                    borderRadius: 12,
                    border: "1px solid #d9e4f2",
                    background: "#fff",
                    color: "#0d2030",
                    padding: "12px 16px",
                    width: "fit-content",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                >
                  Download the app
                </a>
              }
            />

            <PricingCard
              title="Pro"
              price="R199"
              sub="per month • Paystack subscription"
              badge="Most popular"
              popular
              items={[
                { strong: "Unlimited documents" },
                "Email invoices & statements from the app",
                "Priority support",
                "Instant activation via webhook",
              ]}
              cta={
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href={links.portalPricing}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 950,
                      textDecoration: "none",
                      borderRadius: 12,
                      background: "var(--brand)",
                      color: "#fff",
                      padding: "12px 16px",
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    Subscribe to Pro
                  </a>

                  <a
                    href={links.portalDashboard}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      textDecoration: "none",
                      borderRadius: 12,
                      background: "var(--brand-700)",
                      color: "#fff",
                      padding: "12px 16px",
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    Manage billing
                  </a>
                </div>
              }
              note="You’ll be asked to log in first if you’re not signed in."
            />
          </div>

          {/* ✅ Proof / value screenshot (zoomable) */}
          <div className="section reveal" style={{ paddingTop: 40, paddingBottom: 0 }}>
            <div
              className="proofCard"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                padding: 22,
              }}
            >
              <div
                className="proofGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.1fr",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>
                    What you get with Pro
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                    Pro unlocks unlimited documents and premium tools — and your PDFs look professional from day one.
                  </p>

                  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,.08)",
                        background: "rgba(13,32,48,.03)",
                        color: "#0d2030",
                        fontWeight: 900,
                      }}
                    >
                      Branded PDFs
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,.08)",
                        background: "rgba(13,32,48,.03)",
                        color: "#0d2030",
                        fontWeight: 900,
                      }}
                    >
                      Unlimited docs
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,.08)",
                        background: "rgba(13,32,48,.03)",
                        color: "#0d2030",
                        fontWeight: 900,
                      }}
                    >
                      Email from app
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,.08)",
                    background: "#fff",
                  }}
                >
                  <ZoomableImage
                    src="/screenshots/invoice-preview.png"
                    alt="Invoice preview (branded PDF output)"
                    hint="Click to zoom • Esc to close"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* How billing works */}
          <div className="section reveal" style={{ paddingTop: 40, paddingBottom: 0 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 24,
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
            >
              <div
                className="billingGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>
                    How billing works
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    Billing is managed in your account dashboard. Paystack subscription activates Pro automatically after
                    payment.
                  </p>
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>
                    Need help?
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    Have questions about rollout, teams, or invoicing? Email{" "}
                    <a href="mailto:sales@ekasibooks.co.za" style={{ fontWeight: 900 }}>
                      sales@ekasibooks.co.za
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compare plans */}
          <div className="section reveal" style={{ paddingTop: 48 }}>
            <h2 className="h2">Compare plans</h2>

            <div
              role="region"
              aria-label="Plan comparison table"
              style={{
                marginTop: 12,
                overflow: "auto",
                borderRadius: 12,
                border: "1px solid #e7eef7",
                background: "#fff",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  minWidth: 640,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        background: "#f2f6fb",
                        textAlign: "left",
                        fontWeight: 950,
                        color: "var(--ink)",
                        padding: "12px 14px",
                        borderBottom: "1px solid #e7eef7",
                      }}
                    >
                      Feature
                    </th>
                    <th
                      style={{
                        background: "#f2f6fb",
                        textAlign: "left",
                        fontWeight: 950,
                        color: "var(--ink)",
                        padding: "12px 14px",
                        borderBottom: "1px solid #e7eef7",
                      }}
                    >
                      Trial
                    </th>
                    <th
                      style={{
                        background: "#f2f6fb",
                        textAlign: "left",
                        fontWeight: 950,
                        color: "var(--ink)",
                        padding: "12px 14px",
                        borderBottom: "1px solid #e7eef7",
                      }}
                    >
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row.label}>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #e7eef7" }}>{row.label}</td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #e7eef7" }}>
                        <span style={{ fontWeight: 950, color: row.trial ? "#11a36d" : "#b02e2e" }}>
                          {row.trial ? "✓" : "✕"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", borderBottom: "1px solid #e7eef7" }}>
                        <span style={{ fontWeight: 950, color: row.pro ? "#11a36d" : "#b02e2e" }}>
                          {row.pro ? "✓" : "✕"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="section reveal" style={{ paddingTop: 48 }}>
            <h2 className="h2">Pricing FAQ</h2>

            <details>
              <summary>Is it a subscription?</summary>
              <p>Yes. Pro is R199/month billed via Paystack. You can manage billing in your dashboard.</p>
            </details>

            <details>
              <summary>What is Trial?</summary>
              <p>Trial is document-limit based and enforced in the desktop app (not time-based).</p>
            </details>

            <details>
              <summary>Do I need internet?</summary>
              <p>The app works offline. Internet is only needed for login, upgrades, and emailing documents.</p>
            </details>

            <details>
              <summary>Can I cancel anytime?</summary>
              <p>Yes — cancel from your dashboard. Your status updates based on Paystack subscription events.</p>
            </details>
          </div>

          {/* Final CTA */}
          <div className="section reveal" style={{ paddingTop: 48 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 24,
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
                textAlign: "center",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
            >
              <h3 className="h3">Ready to get started?</h3>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                <a
                  href={links.download}
                  style={{
                    borderRadius: 999,
                    padding: "12px 22px",
                    border: "1px solid #d9e4f2",
                    background: "#fff",
                    color: "#0d2030",
                    fontWeight: 950,
                    textDecoration: "none",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                >
                  Download the app
                </a>
                <a
                  href={links.portalDashboard}
                  style={{
                    borderRadius: 999,
                    padding: "12px 22px",
                    border: "1px solid #d9e4f2",
                    background: "#fff",
                    color: "#0d2030",
                    fontWeight: 950,
                    textDecoration: "none",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                >
                  Manage billing
                </a>
              </div>
            </div>
          </div>

          {/* Interactions + responsive */}
          <style>{`
            .reveal {
              opacity: 0;
              transform: translateY(20px);
              transition: all .6s ease;
            }
            .reveal.show {
              opacity: 1;
              transform: translateY(0);
            }

            .pricingGrid > div:hover {
              transform: translateY(-6px);
              box-shadow: 0 18px 54px rgba(10,37,64,.14);
            }

            a:hover {
              transform: translateY(-1px);
            }

            .billCard:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 40px rgba(10,37,64,.12);
            }

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
            details p {
              margin: 0;
              padding: 0 16px 16px;
            }

            @keyframes zoomFade {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @media (max-width: 992px){
              .pricingGrid{
                grid-template-columns: 1fr !important;
              }
              .billingGrid{
                grid-template-columns: 1fr !important;
              }
              .proofGrid{
                grid-template-columns: 1fr !important;
              }
              .container h1{
                font-size: 40px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCta
        primaryHref={links.portalPricing}
        primaryLabel="Subscribe to Pro"
        secondaryHref={links.download}
        secondaryLabel="Download app"
      />
    </main>
  );
}
