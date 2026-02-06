// components/FeaturesClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import StickyCta from "@/components/StickyCta";
import { links } from "@/lib/links";

type FeatureCard = {
  icon: string;
  title: string;
  desc: string;
};

type ShowcaseItem = {
  title: string;
  desc: string;
  src: string;
  alt: string;
};

const topFeatures: FeatureCard[] = [
  {
    icon: "🧾",
    title: "Quotes → Invoices",
    desc: "Create professional quotes and convert to invoices in one click. VAT / no-VAT friendly.",
  },
  {
    icon: "👥",
    title: "Customers",
    desc: "Store customer details, view full history, and keep records organised.",
  },
  {
    icon: "🎨",
    title: "Templates & Branding",
    desc: "Add your logo and colours. Use professional document templates that make you look pro.",
  },
  {
    icon: "💸",
    title: "Payments & Statements",
    desc: "Record payments and generate customer statements instantly — stay on top of who owes you.",
  },
  {
    icon: "💾",
    title: "Backups & Export",
    desc: "Local backups plus CSV export so you’re always in control of your data.",
  },
  {
    icon: "🔌",
    title: "Offline after sign-in",
    desc: "Sign in once, then create quotes and invoices even without internet. Updates happen when you're online.",
  },
];

const showcase: ShowcaseItem[] = [
  {
    title: "See everything at a glance",
    desc: "A simple dashboard that shows your activity, totals and quick actions — so you can work faster.",
    src: "/screenshots/app-dashboard.png",
    alt: "eKasiBooks dashboard overview",
  },
  {
    title: "Invoice tracking that’s actually practical",
    desc: "Create, search and manage invoices in seconds. Keep your books tidy without the headache.",
    src: "/screenshots/invoices-list.png",
    alt: "Invoices list screen",
  },
  {
    title: "Professional PDF output",
    desc: "Clean, branded documents your clients can print or email instantly — invoice previews look exactly like export.",
    src: "/screenshots/invoice-preview.png",
    alt: "Invoice preview screen",
  },
  {
    title: "Quotes, statements and more",
    desc: "Quotes, statements, delivery notes and purchase orders — everything you need is already included.",
    src: "/screenshots/reports-dashboard.png",
    alt: "Reports dashboard screen",
  },
];

const moreIncluded: string[] = [
  "Delivery notes & purchase orders",
  "Reporting & exports",
  "Multiple invoice & document templates",
  "Professional PDF export (print & email ready)",
  "Fast search and tidy customer history",
];

function ZoomableImage({
  src,
  alt,
  hint = "Click to zoom • Esc to close",
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
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
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
              <span style={{ fontWeight: 900, fontSize: 12.5, color: "#0d2030", opacity: 0.85 }}>{hint}</span>
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

export default function FeaturesClient() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => setTimeout(() => el.classList.add("show"), i * 120));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 360, // ↓ was 420
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h1
            className="h1 center reveal"
            style={{
              color: "#fff",
              fontSize: 48, // ↓ was 56
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 12, // ↓ was 14
            }}
          >
            Everything you need to run your small business billing
          </h1>

          <p
            className="center reveal"
            style={{
              color: "#e7f3f4",
              fontSize: 16, // ↓ was 18
              maxWidth: 820, // ↓ was 840
              marginInline: "auto",
              marginTop: 0,
              lineHeight: 1.65,
            }}
          >
            Quotes, invoices, statements — fast, branded and backed up. Built for real-world businesses that need to get
            paid.
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
              href={links.download}
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
              Download the app
            </a>

            <a
              href={links.pricing}
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
              See Pricing
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
            <span>✅ Branded PDFs</span>
            <span>✅ Backups included</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          {/* Feature grid */}
          <div
            className="featuresGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16, // ↓ was 20
            }}
          >
            {topFeatures.map((f) => (
              <div
                key={f.title}
                className="card reveal"
                style={{
                  padding: 18, // ↓ was 22
                  height: "100%",
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span> {/* ↓ was 22 */}
                  <h3 className="h3" style={{ margin: 0 }}>
                    {f.title}
                  </h3>
                </div>
                <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Screenshot showcase */}
          <div className="section" style={{ paddingTop: 44, paddingBottom: 0 }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 14 }}>
              <h2 className="h2" style={{ marginBottom: 6 }}>
                See eKasiBooks in action
              </h2>
              <p className="muted" style={{ margin: 0, maxWidth: 820, marginInline: "auto", lineHeight: 1.6 }}>
                Real screens from the app — so you know exactly what you’re getting before you download.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {showcase.map((s, idx) => {
                const flip = idx % 2 === 1;
                return (
                  <div
                    key={s.title}
                    className="showcaseRow card reveal"
                    style={{
                      padding: 16, // ↓ was 18
                      borderRadius: 16,
                      border: "1px solid var(--ring)",
                      boxShadow: "0 10px 32px rgba(10,37,64,.08)",
                      display: "grid",
                      gridTemplateColumns: "1.05fr .95fr",
                      gap: 16, // ↓ was 18
                      alignItems: "center",
                    }}
                  >
                    <div style={{ order: flip ? 2 : 1 }}>
                      <div
                        style={{
                          borderRadius: 14,
                          overflow: "hidden",
                          border: "1px solid rgba(0,0,0,.08)",
                          background: "#fff",
                        }}
                      >
                        <ZoomableImage src={s.src} alt={s.alt} />
                      </div>
                    </div>

                    <div style={{ order: flip ? 1 : 2 }}>
                      <h3 className="h3" style={{ marginTop: 0, marginBottom: 8 }}>
                        {s.title}
                      </h3>
                      <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
                        {s.desc}
                      </p>

                      <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {["Fast & simple", "Built for SMBs", "Offline after sign-in"].map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 11.5, // ↓ was 12
                              padding: "6px 10px",
                              borderRadius: 999,
                              border: "1px solid rgba(0,0,0,.08)",
                              background: "rgba(13,32,48,.03)",
                              color: "#0d2030",
                              fontWeight: 800,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="reveal" style={{ textAlign: "center", marginTop: 14 }}>
              <a
                href={links.download}
                style={{
                  display: "inline-block",
                  borderRadius: 999,
                  padding: "10px 18px", // ↓ was 12px 22px
                  background: "var(--brand)",
                  color: "#fff",
                  fontWeight: 950,
                  textDecoration: "none",
                  boxShadow: "0 12px 28px rgba(10,37,64,.14)",
                }}
              >
                Download and start billing
              </a>
            </div>
          </div>

          {/* Also included */}
          <div className="section reveal" style={{ paddingTop: 26, paddingBottom: 0 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 20, // ↓ was 24
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
              }}
            >
              <div
                className="alsoGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16, // ↓ was 18
                  alignItems: "start",
                }}
              >
                <div>
                  <h2 className="h2" style={{ marginBottom: 8 }}>
                    Also included
                  </h2>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    These are the core tools you get in eKasiBooks today — designed to keep your billing simple and
                    professional.
                  </p>
                </div>

                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.75 }}>
                  {moreIncluded.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="section reveal" style={{ paddingTop: 38 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                padding: 20, // ↓ was 24
                textAlign: "center",
              }}
            >
              <h3 className="h3" style={{ marginBottom: 8 }}>
                Ready to invoice like a pro?
              </h3>
              <p className="muted" style={{ marginTop: 0 }}>
                Download eKasiBooks and start billing today.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                <a
                  href={links.download}
                  style={{
                    borderRadius: 999,
                    padding: "10px 18px", // ↓ was 12px 22px
                    background: "var(--brand)",
                    color: "#fff",
                    fontWeight: 950,
                    textDecoration: "none",
                  }}
                >
                  Download the app
                </a>
                <a
                  href={links.pricing}
                  style={{
                    borderRadius: 999,
                    padding: "10px 18px", // ↓ was 12px 22px
                    border: "1px solid #d9e4f2",
                    background: "#fff",
                    color: "#0d2030",
                    fontWeight: 950,
                    textDecoration: "none",
                  }}
                >
                  See Pricing
                </a>
              </div>
            </div>
          </div>

          <style>{`
            .reveal { opacity: 0; transform: translateY(20px); transition: all .6s ease; }
            .reveal.show { opacity: 1; transform: translateY(0); }

            .featuresGrid .card:hover {
              transform: translateY(-6px);
              box-shadow: 0 18px 54px rgba(10,37,64,.14);
            }

            a:hover { transform: translateY(-1px); }

            .showcaseRow:hover{
              box-shadow: 0 18px 54px rgba(10,37,64,.12);
              transform: translateY(-3px);
              transition: transform .25s ease, box-shadow .25s ease;
            }

            @keyframes zoomFade { from { opacity: 0; } to { opacity: 1; } }

            @media (max-width: 992px){
              .featuresGrid{ grid-template-columns: 1fr !important; }
              .alsoGrid{ grid-template-columns: 1fr !important; }
              .h1{ font-size: 34px !important; } /* ↓ was 40 */
              .showcaseRow{ grid-template-columns: 1fr !important; }
            }

            @media (max-width: 600px){
              .h1{ font-size: 30px !important; } /* extra shrink on small phones */
            }
          `}</style>
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
