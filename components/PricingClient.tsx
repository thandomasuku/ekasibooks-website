// components/PricingClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { links } from "@/lib/links";
import StickyCta from "@/components/StickyCta";

type BillingCycle = "monthly" | "annual";

type PlanKey = "trial" | "starter" | "growth" | "pro";
type Plan = {
  key: PlanKey;
  title: string;
  badge?: string;
  popular?: boolean;
  monthly: number; // VAT inclusive
  annual: number; // VAT inclusive (rounded to whole Rand)
  companies: number;
  items: Array<string | { strong: string; rest?: string }>;
};

function formatRand(n: number) {
  return `R${n}`;
}

function annualSave(monthly: number, annual: number) {
  return monthly * 12 - annual;
}

function effectiveMonthly(annual: number) {
  return Math.round(annual / 12);
}

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
            padding: 12,
            cursor: "zoom-out",
            animation: "zoomFade .14s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 1100,
              width: "min(1100px, 96vw)",
              maxHeight: "92vh",
              background: "#fff",
              borderRadius: 14,
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
                padding: 8,
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
                  padding: "7px 9px",
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
        padding: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        outline: popular ? "2px solid rgba(33,93,99,.14)" : "none",
        transition: "transform .25s ease, box-shadow .25s ease",
        transform: popular ? "translateY(-4px)" : "none",
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
              fontSize: 11.5,
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
  const portalBase = "https://portal.ekasibooks.co.za";
  const portalRegister = `${portalBase}/register`;
  const portalBilling = `${portalBase}/billing`;

  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 120);
    });
  }, []);

  const plans: Plan[] = useMemo(
    () => [
      {
        key: "trial",
        title: "Trial",
        monthly: 0,
        annual: 0,
        companies: 1,
        items: [
          { strong: "1 company", rest: "(trial)" },
          "5 invoices, 5 quotes, 5 purchase orders",
          "Customers, statements & PDF export",
          "Local data (offline-capable after sign-in)",
          "Limits apply in the desktop app (not time-based)",
        ],
      },
      {
        key: "starter",
        title: "Starter",
        monthly: 199,
        annual: 2149,
        companies: 1,
        items: [
          { strong: "1 company" },
          { strong: "Unlimited documents" },
          "Quotes, invoices, statements & purchase orders",
          "Email drafts (via your email client)",
          "Backup & restore",
        ],
      },
      {
        key: "growth",
        title: "Growth",
        badge: "Most popular",
        popular: true,
        monthly: 399,
        annual: 4309,
        companies: 3,
        items: [{ strong: "Up to 3 companies" }, { strong: "Unlimited documents" }, "Everything in Starter", "Priority support"],
      },
      {
        key: "pro",
        title: "Pro",
        monthly: 599,
        annual: 6469,
        companies: 5,
        items: [{ strong: "Up to 5 companies" }, { strong: "Unlimited documents" }, "Everything in Growth", "Priority support"],
      },
    ],
    []
  );

  const compareRows = useMemo(
    () => [
      { label: "Companies", trial: "1", starter: "1", growth: "3", pro: "5" },
      { label: "Invoices", trial: "5", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited" },
      { label: "Quotes", trial: "5", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited" },
      { label: "Purchase Orders", trial: "5", starter: "Unlimited", growth: "Unlimited", pro: "Unlimited" },
      { label: "Statements & Customers", trial: "✓", starter: "✓", growth: "✓", pro: "✓" },
      { label: "PDF export", trial: "✓", starter: "✓", growth: "✓", pro: "✓" },
      { label: "Backup & restore", trial: "✓", starter: "✓", growth: "✓", pro: "✓" },
      { label: "Email drafts (via your email client)", trial: "✓", starter: "✓", growth: "✓", pro: "✓" },
      { label: "Priority support", trial: "—", starter: "—", growth: "✓", pro: "✓" },
      { label: "VAT included", trial: "✓", starter: "✓", growth: "✓", pro: "✓" },
    ],
    []
  );

  const primaryCtaLabel = (k: PlanKey) => {
    if (k === "trial") return "Create free account";
    if (k === "starter") return "Choose Starter";
    if (k === "growth") return "Choose Growth";
    return "Choose Pro";
  };

  const billingHrefFor = (k: Exclude<PlanKey, "trial">) => `${portalBilling}?plan=${k}`;

  const registerHrefFor = (k: PlanKey) =>
    `${portalRegister}?plan=${k}&next=${encodeURIComponent(`/billing?plan=${k}`)}`;

  const hrefFor = (k: PlanKey) => (k === "trial" ? registerHrefFor(k) : billingHrefFor(k));

  return (
    <main>
      <section
        style={{
          minHeight: 360,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="containerWide reveal" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h1
            className="h1 center"
            style={{
              color: "#fff",
              fontSize: 48,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Simple pricing that grows with your business
          </h1>

          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 0,
              fontSize: 16,
              maxWidth: 760,
              marginInline: "auto",
              lineHeight: 1.65,
            }}
          >
            All prices include VAT. Start on Trial (document-limit based in the desktop app). Upgrade anytime when you’re ready.
          </p>

          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <a
              href={portalBilling}
              style={{
                borderRadius: 999,
                padding: "11px 18px",
                fontWeight: 950,
                textDecoration: "none",
                background: "#fff",
                color: "var(--brand-700)",
                border: "1px solid rgba(255,255,255,.25)",
                boxShadow: "0 10px 22px rgba(0,0,0,.18)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
            >
              View plans & subscribe
            </a>

            <a
              href={links.download}
              style={{
                borderRadius: 999,
                padding: "11px 18px",
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
              gap: 14,
              flexWrap: "wrap",
              marginTop: 14,
              color: "rgba(255,255,255,.85)",
              fontSize: 13,
            }}
          >
            <span>✅ Works offline after sign-in</span>
            <span>✅ Paystack subscription</span>
            <span>✅ Cancel anytime</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="containerWide">
          <div className="reveal" style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
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
                    background: "#36454F",
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

          <p className="muted reveal" style={{ textAlign: "center", marginTop: 10, fontSize: 12.5 }}>
            Annual plans save 10% and are VAT inclusive.
          </p>

          <div
            className="pricingGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 16,
              alignItems: "stretch",
              marginTop: 22,
            }}
          >
            {plans.map((p) => {
              const isTrial = p.key === "trial";
              const isAnnual = billingCycle === "annual" && !isTrial;

              const price = isTrial ? "Free" : isAnnual ? formatRand(p.annual) : formatRand(p.monthly);

              const sub = isTrial
                ? "document-limit based • no card required"
                : isAnnual
                ? `R${effectiveMonthly(p.annual)}/month • billed annually (${formatRand(p.annual)}) • Save R${annualSave(
                    p.monthly,
                    p.annual
                  )}`
                : `per month • VAT incl. • Paystack subscription`;

              const note = isTrial
                ? "You’ll create your account first, then continue to billing."
                : "You’ll be asked to log in first if you’re not signed in.";

              return (
                <PricingCard
                  key={p.key}
                  title={p.title}
                  price={price}
                  sub={sub}
                  badge={p.badge}
                  popular={p.popular}
                  items={p.items}
                  cta={
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <a
                        href={hrefFor(p.key)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 950,
                          textDecoration: "none",
                          borderRadius: 12,
                          background: "var(--brand)",
                          color: "#fff",
                          padding: "10px 14px",
                          transition: "transform .2s ease, box-shadow .2s ease",
                        }}
                      >
                        {primaryCtaLabel(p.key)}
                      </a>

                      <a
                        href={isTrial ? links.download : hrefFor(p.key)}
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
                          padding: "10px 14px",
                          transition: "transform .2s ease, box-shadow .2s ease",
                        }}
                      >
                        {isTrial ? "Download the app" : "View billing"}
                      </a>
                    </div>
                  }
                  note={note}
                />
              );
            })}
          </div>

          <div className="section reveal" style={{ paddingTop: 32, paddingBottom: 0 }}>
            <div
              className="proofCard"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                padding: 18,
              }}
            >
              <div
                className="proofGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.1fr",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>
                    What you get when you upgrade
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    Paid plans unlock unlimited documents and premium tools — and your PDFs look professional from day one.
                  </p>

                  <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Branded PDFs", "Unlimited docs", "Multi-company"].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11.5,
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
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 900 }}>
                <thead>
                  <tr>
                    {["Feature", "Trial", "Starter", "Growth", "Pro"].map((h) => (
                      <th
                        key={h}
                        style={{
                          background: "#f2f6fb",
                          textAlign: "left",
                          fontWeight: 950,
                          color: "var(--ink)",
                          padding: "11px 13px",
                          borderBottom: "1px solid #e7eef7",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7" }}>{row.label}</td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7", fontWeight: 900 }}>
                        {(row as any).trial}
                      </td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7", fontWeight: 900 }}>
                        {(row as any).starter}
                      </td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7", fontWeight: 900 }}>
                        {(row as any).growth}
                      </td>
                      <td style={{ padding: "11px 13px", borderBottom: "1px solid #e7eef7", fontWeight: 900 }}>
                        {(row as any).pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section reveal" style={{ paddingTop: 38 }}>
            <h2 className="h2">Pricing FAQ</h2>

            <details>
              <summary>Are prices VAT inclusive?</summary>
              <p>Yes. All listed prices include VAT.</p>
            </details>

            <details>
              <summary>Is it a subscription?</summary>
              <p>
                Yes. Paid plans are billed via Paystack. Choose monthly or annual (annual saves 10%). You can manage billing in your dashboard.
              </p>
            </details>

            <details>
              <summary>What is Trial?</summary>
              <p>Trial is document-limit based and enforced in the desktop app (not time-based).</p>
            </details>

            <details>
              <summary>Do I need internet?</summary>
              <p>
                You’ll need internet to sign in and manage upgrades. Once you’re signed in, you can work offline day-to-day.
                When you choose to email a document, we open a draft in your email app so you can send it from your own account.
              </p>
            </details>

            <details>
              <summary>Can I cancel anytime?</summary>
              <p>Yes — cancel from your dashboard. Your status updates based on Paystack subscription events.</p>
            </details>

            <details>
              <summary>What happens if I downgrade?</summary>
              <p>
                If your new plan supports fewer companies, you’ll be asked to choose which companies remain accessible under that plan.
              </p>
            </details>
          </div>

          <div className="section reveal" style={{ paddingTop: 38 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 20,
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
                    padding: "10px 18px",
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
                    padding: "10px 18px",
                    border: "1px solid #d9e4f2",
                    background: "#fff",
                    color: "#0d2030",
                    fontWeight: 950,
                    textDecoration: "none",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                >
                  View plans & billing
                </a>
              </div>
            </div>
          </div>

          <style>{`
            .reveal { opacity: 0; transform: translateY(20px); transition: all .6s ease; }
            .reveal.show { opacity: 1; transform: translateY(0); }

            .pricingGrid > div:hover { transform: translateY(-6px) !important; box-shadow: 0 18px 54px rgba(10,37,64,.14); }
            a:hover { transform: translateY(-1px); }

            .billCard:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(10,37,64,.12); }

            details {
              margin-top: 12px;
              border: 1px solid rgba(0,0,0,.06);
              border-radius: 12px;
              background: #fff;
              overflow: hidden;
              box-shadow: 0 8px 22px rgba(10,37,64,.06);
            }
            details:first-of-type { margin-top: 0; }
            details > summary { padding: 12px 14px; cursor: pointer; font-weight: 900; list-style: none; }
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
            details p { margin: 0; padding: 0 14px 14px; }

            @keyframes zoomFade { from { opacity: 0; } to { opacity: 1; } }

            @media (max-width: 1200px){
              .pricingGrid{ grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            }

            @media (max-width: 720px){
              .pricingGrid{ grid-template-columns: 1fr !important; }
            }

            @media (max-width: 992px){
              .billingGrid{ grid-template-columns: 1fr !important; }
              .proofGrid{ grid-template-columns: 1fr !important; }
              .container h1{ font-size: 34px !important; }
            }

            @media (max-width: 600px){
              .container h1{ font-size: 30px !important; }
            }
          `}</style>
        </div>
      </section>

      <StickyCta
        primaryHref={portalBilling}
        primaryLabel="View plans & billing"
        secondaryHref={links.download}
        secondaryLabel="Download app"
      />
    </main>
  );
}