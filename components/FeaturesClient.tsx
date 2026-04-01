"use client";

import Image from "next/image";
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
    desc: "Create professional quotes and convert them to invoices in one click. VAT / no-VAT friendly.",
  },
  {
    icon: "🛒",
    title: "WooCommerce Integration",
    desc: "Sync your products directly from WooCommerce. Choose specific categories, avoid manual setup, and use your store as your working catalog.",
  },
  {
    icon: "☁️",
    title: "Cloud Sync",
    desc: "Growth and Pro plans sync customers, quotes, invoices, company details, and settings across devices.",
  },
  {
    icon: "🏢",
    title: "Multi-Company",
    desc: "Manage multiple businesses from one account, with company access based on your plan.",
  },
  {
    icon: "👥",
    title: "Customers",
    desc: "Store customer details, view full history, and keep records organised.",
  },
  {
    icon: "💸",
    title: "Payments & Statements",
    desc: "Record payments and generate customer statements instantly — stay on top of who owes you.",
  },
  {
    icon: "🔌",
    title: "Offline + Multi-Device",
    desc: "Work offline after sign-in, then sync supported data when you're back online. Growth supports up to 2 active sessions, Pro up to 4.",
  },
];

const showcase: ShowcaseItem[] = [
  {
    title: "Connect your WooCommerce store",
    desc: "Sync products directly from your WooCommerce store and choose exactly what to import. No more copying products manually.",
    src: "/screenshots/store-sync.png",
    alt: "WooCommerce store sync with category selection",
  },
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
    title: "Quotes, statements, sync and more",
    desc: "Quotes, statements, delivery notes, purchase orders, and cloud sync on supported plans — everything you need is built in.",
    src: "/screenshots/reports-dashboard.png",
    alt: "Reports dashboard screen",
  },
];

const moreIncluded: string[] = [
  "WooCommerce product sync (category-based import)",
  "Delivery notes & purchase orders",
  "Reporting & exports",
  "Multiple invoice & document templates",
  "Professional PDF export (print & email ready)",
  "Fast search and tidy customer history",
  "Manual local backup & restore",
  "Cloud sync for supported plans",
  "Company details & settings sync on Growth and Pro",
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
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority={src === "/screenshots/app-dashboard.png" || src === "/screenshots/store-sync.png"}
        />
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
              <span style={{ fontWeight: 900, fontSize: 12.5, color: "#0d2030", opacity: 0.85 }}>{hint}</span>
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
              <Image
                src={src}
                alt={alt}
                width={1400}
                height={900}
                sizes="100vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
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
      <section
        style={{
          minHeight: 360,
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
              fontSize: 48,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Everything you need to run your small business billing
          </h1>

          <p
            className="center reveal"
            style={{
              color: "#e7f3f4",
              fontSize: 16,
              maxWidth: 820,
              marginInline: "auto",
              marginTop: 0,
              lineHeight: 1.65,
            }}
          >
            Quotes, invoices, statements, cloud sync, and company setup that travels with you. Built for real-world
            businesses that need to work faster and get paid.
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
              href={links.download}
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
              Download the app
            </a>

            <a
              href={links.pricing}
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
              See Pricing
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
            <span>✅ Cloud sync on Growth & Pro</span>
            <span>✅ WooCommerce product sync available</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          <div
            className="featuresGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            {topFeatures.map((f) => (
              <div
                key={f.title}
                className="card reveal"
                style={{
                  padding: 18,
                  height: "100%",
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
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
                      padding: 16,
                      borderRadius: 16,
                      border: "1px solid var(--ring)",
                      boxShadow: "0 10px 32px rgba(10,37,64,.08)",
                      display: "grid",
                      gridTemplateColumns: "1.05fr .95fr",
                      gap: 16,
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
                              fontSize: 11.5,
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
                  padding: "10px 18px",
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

          <div className="section reveal" style={{ paddingTop: 26, paddingBottom: 0 }}>
            <div
              className="billCard"
              style={{
                background: "var(--card)",
                borderRadius: 16,
                padding: 20,
                border: "1px solid var(--ring)",
                boxShadow: "0 8px 28px rgba(10,37,64,.08)",
              }}
            >
              <div
                className="alsoGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <div>
                  <h2 className="h2" style={{ marginBottom: 8 }}>
                    Also included
                  </h2>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                    These are the core tools available in eKasiBooks today — from everyday billing to cloud sync and
                    multi-company workflows on supported plans.
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

          <div className="section reveal" style={{ paddingTop: 38 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                padding: 20,
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
                    padding: "10px 18px",
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
                    padding: "10px 18px",
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
              .h1{ font-size: 34px !important; }
              .showcaseRow{ grid-template-columns: 1fr !important; }
            }

            @media (max-width: 600px){
              .h1{ font-size: 30px !important; }
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