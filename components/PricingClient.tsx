// components/PricingClient.tsx
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
  { label: "Email drafts (via your email client)", trial: false, pro: true },
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
            padding: 12, // ↓ was 16
            cursor: "zoom-out",
            animation: "zoomFade .14s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 1100, // ↓ was 1200
              width: "min(1100px, 96vw)", // ↓ was 1200
              maxHeight: "92vh",
              background: "#fff",
              borderRadius: 14, // ↓ was 16
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
                padding: 8, // ↓ was 10
                borderBottom: "1px solid rgba(0,0,0,.06)",
                background: "#fff",
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 12.5,
                  color: "#0d2030",
                  opacity: 0.85,
                }}
              >
                {hint}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  border: "1px solid rgba(0,0,0,.10)",
                  background: "#fff",
                  borderRadius: 10,
                  padding: "7px 9px", // ↓ was 8px 10px
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ overflow: "auto", background: "#f7f9fc" }}>
              <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />
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
        boxShadow: popular ? "0 16px 46px rgba(10,37,64,.14)" : "0 10px 32px rgba(10,37,64,.10)",
        padding: 20, // ↓ was 24
        display: "flex",
        flexDirection: "column",
        height: "100%",
        outline: popular ? "2px solid rgba(33,93,99,.14)" : "none",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
    >
      <div style={{ minHeight: 30, display: "flex", alignItems: "center", marginBottom: 8 }}>
        {badge ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: popular ? "var(--brand-700)" : "var(--brand)",
              color: "#fff",
              fontSize: 11.5, // ↓ was 12
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

      <h3 className="h3" style={{ marginBottom: 8 }}>
        {title}
      </h3>

      <p style={{ fontSize: 40, fontWeight: 950, color: "var(--brand)", margin: "0 0 2px" }}>{price}</p>

      <p className="muted" style={{ fontSize: 13.5, margin: "0 0 10px" }}>
        {sub}
      </p>

      <ul style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.65 }}>
        {items.map((it, idx) => {
          if (typeof it === "string") {
            return (
              <li key={idx} style={{ margin: ".22rem 0" }}>
                {it}
              </li>
            );
          }
          return (
            <li key={idx} style={{ margin: ".22rem 0" }}>
              <strong>{it.strong}</strong>
              {it.rest ? ` ${it.rest}` : ""}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: "auto", paddingTop: 14 }}>{cta}</div>

      {note ? (
        <p className="muted" style={{ marginTop: 10, fontSize: 12.5, marginBottom: 0 }}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

export default function PricingClient() {
  // Portal rules: all pages are protected except login/register,
  // so CTAs must point to real portal destinations that handle auth gating.
  const portalRegister = "https://portal.ekasibooks.co.za/register";
  const portalBilling = "https://portal.ekasibooks.co.za/billing";

  // Pricing display (website)
  const MONTHLY_PRICE = 199;
  const ANNUAL_PRICE = 2149; // ✅ 10% discount vs R199 x 12
  const annualSave = MONTHLY_PRICE * 12 - ANNUAL_PRICE; // 2388 - 2149 = 239

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

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
          minHeight: 360, // ↓ was 420
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container reveal" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h1
            className="h1 center"
            style={{
              color: "#fff",
              fontSize: 48, // ↓ was 56
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 12, // ↓ was 14
            }}
          >
            Simple pricing that grows with your business
          </h1>

          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 0,
              fontSize: 16, // ↓ was 18
              maxWidth: 760, // ↓ was 780
              marginInline: "auto",
              lineHeight: 1.65,
            }}
          >
            Start on Trial (document-limit based in the desktop app). Upgrade anytime to Pro for unlimited usage.
          </p>

          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12, // ↓ was 14
              flexWrap: "wrap",
              marginTop: 20, // ↓ was 26
            }}
          >
            <a
              href={portalBilling}
              style={{
                borderRadius: 999,
                padding: "11px 18px", // ↓ was 14px 20px
                fontWeight: 950,
                textDecoration: "none",
                background: "#fff",
                color: "var(--brand-700)",
                border: "1px solid rgba(255,255,255,.25)",
                boxShadow: "0 10px 22px rgba(0,0,0,.18)", // slightly tighter
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              Subscribe to Pro
            </a>

            <a
              href={links.download}
              style={{
                borderRadius: 999,
                padding: "11px 18px", // ↓ was 14px 20px
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
              gap: 14, // ↓ was 18
              flexWrap: "wrap",
              marginTop: 14, // ↓ was 18
              color: "rgba(255,255,255,.85)",
              fontSize: 13, // ↓ was 14
            }}
          >
            <span>✅ Works offline after sign-in</span>
            <span>✅ Paystack subscription</span>
            <span>✅ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ✅ REST OF PAGE CONTENT */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          {/* Billing cycle toggle */}
          <div
            className="reveal"
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: 6,
                padding: 6,
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,.08)",
                background: "rgba(255,255,255,.7)",
                boxShadow: "0 10px 26px rgba(10,37,64,.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "9px 12px",
                  fontWeight: 950,
                  fontSize: 12.5,
                  background: billingCycle === "monthly" ? "var(--brand)" : "transparent",
                  color: billingCycle === "monthly" ? "#fff" : "#0d2030",
                }}
                aria-pressed={billingCycle === "monthly"}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "9px 12px",
                  fontWeight: 950,
                  fontSize: 12.5,
                  background: billingCycle === "annual" ? "var(--brand)" : "transparent",
                  color: billingCycle === "annual" ? "#fff" : "#0d2030",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                aria-pressed={billingCycle === "annual"}
              >
                Annual
                <span
  style={{
    fontSize: 11,
    fontWeight: 950,
    padding: "4px 8px",
    borderRadius: 999,
    background: "#36454F",           // strong amber
    border: "1px solid white",
    color: "rgba(255,255,255,0.95)",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 6px rgba(0,0,0,.12)",
  }}
  title="Annual plan discount"
>
  Save 10%
</span>

              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            className="pricingGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 16, // ↓ was 20
              alignItems: "stretch",
              marginTop: 22, // ↓ was 28
            }}
          >
            <PricingCard
              title="Trial"
              price="Free"
              sub="document-limit based • no card required"
              items={[
                "Quotes, Invoices, Statements",
                "Customers & PDF export",
                "Local data (offline-capable after sign-in)",
                "Trial limit applies in the desktop app",
              ]}
              cta={
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href={portalRegister}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 950,
                      textDecoration: "none",
                      borderRadius: 12,
                      background: "var(--brand)",
                      color: "#fff",
                      padding: "10px 14px", // ↓ was 12px 16px
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    Create free account
                  </a>

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
                      padding: "10px 14px", // ↓ was 12px 16px
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    Download the app
                  </a>
                </div>
              }
            />

            <PricingCard
              title="Pro"
              price={billingCycle === "annual" ? "R2149" : "R199"}
              sub={
                billingCycle === "annual"
                  ? `per year • Save R${annualSave} annually`
                  : "per month • Paystack subscription"
              }
              badge={billingCycle === "annual" ? "Best value" : "Most popular"}
              popular
              items={[
                { strong: "Unlimited documents" },
                "Email drafts for invoices & statements (via your email client)",
                "Priority support",
                "Activation updates automatically after payment",
              ]}
              cta={
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href={portalBilling}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 950,
                      textDecoration: "none",
                      borderRadius: 12,
                      background: "var(--brand)",
                      color: "#fff",
                      padding: "10px 14px", // ↓ was 12px 16px
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    {billingCycle === "annual" ? "Subscribe annually" : "Subscribe to Pro"}
                  </a>

                  <a
                    href={portalBilling}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      textDecoration: "none",
                      borderRadius: 12,
                      background: "var(--brand-700)",
                      color: "#fff",
                      padding: "10px 14px", // ↓ was 12px 16px
                      transition: "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    Manage billing
                  </a>
                </div>
              }
              note={
                billingCycle === "annual"
                  ? "Annual billing will be available soon — this page is updated first. Checkout will follow once Paystack annual is added."
                  : "You’ll be asked to log in first if you’re not signed in."
              }
            />
          </div>

          {/* Proof / value screenshot (zoomable) */}
          <div className="section reveal" style={{ paddingTop: 32, paddingBottom: 0 }}>
            <div
              className="proofCard"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                padding: 18, // ↓ was 22
              }}
            >
              <div
                className="proofGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.1fr",
                  gap: 16, // ↓ was 18
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>
                    What you get with Pro
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    Pro unlocks unlimited documents and premium tools — and your PDFs look professional from day one.
                  </p>

                  <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Branded PDFs", "Unlimited docs", "Email drafts"].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11.5, // ↓ was 12
                          padding: "6px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(0,0,0,.08)",
                          background: "rgba(13,32,48,.03)",
                          color: "#0d2030",
                          fontWeight: 900,
                        }}
                      >
                        {t}
                      </span>
                    ))}
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
                    alt="Branded invoice PDF preview generated by eKasiBooks"
                    hint="Click to zoom • Esc to close"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* How billing works */}
          <div className="section reveal" style={{ paddingTop: 32, paddingBottom: 0 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 20, // ↓ was 24
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
            >
              <div className="billingGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
          <div className="section reveal" style={{ paddingTop: 38 }}>
            <h2 className="h2">Compare plans</h2>

            <div
              role="region"
              aria-label="Plan comparison table"
              style={{
                marginTop: 10,
                overflow: "auto",
                borderRadius: 12,
                border: "1px solid #e7eef7",
                background: "#fff",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 640 }}>
                <thead>
                  <tr>
                    {["Feature", "Trial", "Pro"].map((h) => (
                      <th
                        key={h}
                        style={{
                          background: "#f2f6fb",
                          textAlign: "left",
                          fontWeight: 950,
                          color: "var(--ink)",
                          padding: "11px 13px", // ↓ was 12px 14px
                          borderBottom: "1px solid #e7eef7",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row.label}>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7" }}>{row.label}</td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7" }}>
                        <span style={{ fontWeight: 950, color: row.trial ? "#11a36d" : "#b02e2e" }}>
                          {row.trial ? "✓" : "✕"}
                        </span>
                      </td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7" }}>
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
          <div className="section reveal" style={{ paddingTop: 38 }}>
            <h2 className="h2">Pricing FAQ</h2>

            <details>
              <summary>Is it a subscription?</summary>
              <p>
                Yes. Pro is billed via Paystack. Monthly is R199, and an annual option (R2149/year) is being added next.
                You can manage billing in your dashboard.
              </p>
            </details>

            <details>
              <summary>What is Trial?</summary>
              <p>Trial is document-limit based and enforced in the desktop app (not time-based).</p>
            </details>

            <details>
              <summary>Do I need internet?</summary>
              <p>
                You’ll need internet to sign in and manage upgrades. Once you’re signed in, you can work offline
                day-to-day. When you choose to email a document, we open a draft in your email app so you can send it
                from your own account.
              </p>
            </details>

            <details>
              <summary>Can I cancel anytime?</summary>
              <p>Yes — cancel from your dashboard. Your status updates based on Paystack subscription events.</p>
            </details>
          </div>

          {/* Final CTA */}
          <div className="section reveal" style={{ paddingTop: 38 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 20, // ↓ was 24
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
                textAlign: "center",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
            >
              <h3 className="h3">Ready to get started?</h3>

              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                <a
                  href={links.download}
                  style={{
                    borderRadius: 999,
                    padding: "10px 18px", // ↓ was 12px 22px
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
                  href={portalBilling}
                  style={{
                    borderRadius: 999,
                    padding: "10px 18px", // ↓ was 12px 22px
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
            .reveal { opacity: 0; transform: translateY(20px); transition: all .6s ease; }
            .reveal.show { opacity: 1; transform: translateY(0); }

            .pricingGrid > div:hover { transform: translateY(-6px); box-shadow: 0 18px 54px rgba(10,37,64,.14); }
            a:hover { transform: translateY(-1px); }

            .billCard:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(10,37,64,.12); }

            details {
              margin-top: 12px; /* ↓ was 14 */
              border: 1px solid rgba(0,0,0,.06);
              border-radius: 12px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0 8px 22px rgba(10,37,64,.06);
            }
            details:first-of-type { margin-top: 0; }
            details > summary { padding: 12px 14px; cursor: pointer; font-weight: 900; list-style: none; } /* ↓ was 14px 16px */
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
            details p { margin: 0; padding: 0 14px 14px; } /* ↓ was 0 16px 16px */

            @keyframes zoomFade { from { opacity: 0; } to { opacity: 1; } }

            @media (max-width: 992px){
              .pricingGrid{ grid-template-columns: 1fr !important; }
              .billingGrid{ grid-template-columns: 1fr !important; }
              .proofGrid{ grid-template-columns: 1fr !important; }
              .container h1{ font-size: 34px !important; } /* ↓ was 40 */
            }

            @media (max-width: 600px){
              .container h1{ font-size: 30px !important; }
            }
          `}</style>
        </div>
      </section>

      <StickyCta
        primaryHref={portalBilling}
        primaryLabel="Subscribe to Pro"
        secondaryHref={links.download}
        secondaryLabel="Download app"
      />
    </main>
  );
}
