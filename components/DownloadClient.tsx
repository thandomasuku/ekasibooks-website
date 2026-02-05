// components/DownloadClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { links } from "@/lib/links";
import StickyCta from "@/components/StickyCta";

const DOWNLOADS = [
  {
    label: "💻 Download for Windows",
    sub: "Windows 10 / 11 · 64-bit",
    href: "/downloads/desktop/eKasiBooks-Setup-latest.exe",
    tone: "primary",
  },
  {
    label: "🍎 macOS",
    sub: "Coming soon",
    href: "#",
    tone: "secondary",
    disabled: true,
  },
] as const;

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
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 13,
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
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function DownloadClient() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 120);
    });
  }, []);

  // If you later add screenshots for SmartScreen steps, flip this to true.
  // Expected paths:
  // /public/screenshots/smartscreen-more-info.png
  // /public/screenshots/smartscreen-run-anyway.png
  const SHOW_SMARTSCREEN_SCREENSHOTS = false;

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 380,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(900px 500px at 10% 0%, rgba(255,255,255,.12), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container reveal" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h1 className="h1 center" style={{ color: "#fff" }}>
            Download eKasiBooks
          </h1>
          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 14,
              fontSize: 18,
              maxWidth: 680,
              marginInline: "auto",
            }}
          >
            Install once. Work offline. Look professional.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          {/* DOWNLOAD + SCREENSHOT */}
          <div
            className="topGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              alignItems: "start",
              marginBottom: 56,
            }}
          >
            {/* DOWNLOAD CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
              {DOWNLOADS.map((d, i) => {
                const disabled = "disabled" in d && d.disabled;

                return (
                  <a
                    key={d.label}
                    href={disabled ? undefined : d.href}
                    aria-disabled={disabled ? true : undefined}
                    className="downloadCard reveal"
                    onClick={(e) => {
                      if (disabled) e.preventDefault();
                    }}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "transform .25s ease, box-shadow .25s ease",
                      animationDelay: `${i * 120}ms`,
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        padding: 26,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h3 className="h3" style={{ marginBottom: 6 }}>
                          {d.label}
                        </h3>
                        <p className="muted" style={{ marginTop: 0 }}>
                          {d.sub}
                        </p>
                      </div>

                      <div
                        style={{
                          marginTop: 18,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          fontWeight: 900,
                          color: "#fff",
                          background: disabled
                            ? "rgba(13,32,48,.35)"
                            : d.tone === "primary"
                            ? "var(--brand)"
                            : "var(--brand-700)",
                          padding: "12px 18px",
                          borderRadius: 999,
                          width: "fit-content",
                        }}
                      >
                        {disabled ? (
                          "Coming soon"
                        ) : (
                          <>
                            Download <span aria-hidden>→</span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}

              {/* SMARTSCREEN NOTICE */}
              <div
                className="reveal"
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(0,0,0,.10)",
                  background: "rgba(13,32,48,.03)",
                  padding: 16,
                  lineHeight: 1.6,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 18, lineHeight: 1 }}>🛡️</div>
                  <div>
                    <strong style={{ color: "var(--ink)" }}>Windows SmartScreen notice</strong>
                    <p className="muted" style={{ margin: "6px 0 0", fontSize: 14 }}>
                      Because eKasiBooks is a newer desktop app, Windows may show a “protected your PC” message on first
                      install. This is normal for new publishers.
                    </p>

                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontWeight: 900, fontSize: 13, color: "var(--ink)", opacity: 0.9 }}>
                        If you see the warning:
                      </div>
                      <ol
                        style={{
                          margin: "6px 0 0",
                          paddingLeft: 18,
                          color: "var(--muted)",
                          fontSize: 14,
                        }}
                      >
                        <li>
                          Click <strong style={{ color: "var(--ink)" }}>More info</strong>
                        </li>
                        <li>
                          Click <strong style={{ color: "var(--ink)" }}>Run anyway</strong>
                        </li>
                      </ol>
                    </div>

                    <p className="muted" style={{ margin: "10px 0 0", fontSize: 13 }}>
                      Always download from <strong style={{ color: "var(--ink)" }}>ekasibooks.co.za</strong>.
                    </p>
                  </div>
                </div>

                {/* COLLAPSIBLE INSTALL GUIDE */}
                <details className="installDetails" style={{ marginTop: 12 }}>
                  <summary className="installSummary">
                    How to install safely (step-by-step)
                    <span className="chev" aria-hidden>
                      ▾
                    </span>
                  </summary>

                  <div className="installBody">
                    <ol className="installList">
                      <li>
                        Download <strong>eKasiBooks-Setup-latest.exe</strong> from{" "}
                        <strong>ekasibooks.co.za</strong>.
                      </li>
                      <li>
                        If Windows shows <em>“Windows protected your PC”</em>, click{" "}
                        <strong>More info</strong>.
                      </li>
                      <li>
                        Click <strong>Run anyway</strong> to start the installer.
                      </li>
                      <li>
                        Follow the installer prompts. After installation, you can open eKasiBooks from the Start Menu.
                      </li>
                    </ol>

                    <div className="installNote">
                      <strong>Tip:</strong> If your company uses managed PCs, your IT team can approve the installer for
                      easier installs in future.
                    </div>

                    {SHOW_SMARTSCREEN_SCREENSHOTS ? (
                      <div className="ssGrid">
                        <div className="ssCard">
                          <div className="ssTitle">Step 1: Click “More info”</div>
                          <img
                            src="/screenshots/smartscreen-more-info.png"
                            alt='Windows SmartScreen: click "More info"'
                            style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
                            loading="lazy"
                          />
                        </div>
                        <div className="ssCard">
                          <div className="ssTitle">Step 2: Click “Run anyway”</div>
                          <img
                            src="/screenshots/smartscreen-run-anyway.png"
                            alt='Windows SmartScreen: click "Run anyway"'
                            style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </details>
              </div>

              <div className="reveal" style={{ paddingLeft: 2 }}>
                <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                  Tip: After installing, you can work offline. Internet is only needed for updates, upgrades and sending
                  emails.
                </p>
              </div>
            </div>

            {/* SCREENSHOT PROOF */}
            <div className="reveal">
              <div
                className="card"
                style={{
                  padding: 18,
                  borderRadius: 16,
                  border: "1px solid rgba(0,0,0,.06)",
                  background: "#fff",
                  boxShadow: "0 10px 32px rgba(10,37,64,.10)",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <h3 className="h3" style={{ margin: "0 0 6px" }}>
                    What it looks like
                  </h3>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                    A clean dashboard and fast billing flow — click the screenshot to zoom.
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,.08)",
                    background: "#fff",
                  }}
                >
                  <ZoomableImage src="/screenshots/app-dashboard.png" alt="eKasiBooks dashboard screenshot" />
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                  {["Offline-first", "Fast search", "Branded PDFs"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
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
          </div>

          {/* TRUST STRIP */}
          <div
            className="reveal trustGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: 24,
              marginBottom: 56,
            }}
          >
            <div className="thinCard">
              <strong>Works offline</strong>
              <p className="muted" style={{ marginTop: 6 }}>
                No internet required for daily use.
              </p>
            </div>

            <div className="thinCard">
              <strong>Secure backups</strong>
              <p className="muted" style={{ marginTop: 6 }}>
                Export and store your data safely.
              </p>
            </div>

            <div className="thinCard">
              <strong>No bloat</strong>
              <p className="muted" style={{ marginTop: 6 }}>
                Fast install. Lightweight desktop app.
              </p>
            </div>
          </div>

          {/* REQUIREMENTS */}
          <div className="reveal">
            <h2 className="h3" style={{ marginBottom: 14 }}>
              System requirements
            </h2>
            <ul style={{ paddingLeft: 18, color: "var(--muted)", lineHeight: 1.8, maxWidth: 640 }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Windows:</strong> 10 or 11 (64-bit), 500 MB free space
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>macOS:</strong> Monterey (12) or later, 500 MB free space
              </li>
              <li>Optional internet connection for updates</li>
            </ul>

            <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>
              By downloading you agree to our{" "}
              <a href="/privacy" style={{ fontWeight: 900 }}>
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* INTERACTIONS */}
          <style>{`
            .reveal { opacity: 0; transform: translateY(20px); transition: all .6s ease; }
            .reveal.show { opacity: 1; transform: translateY(0); }

            .downloadCard:hover { transform: translateY(-4px); }
            .card:hover { box-shadow: 0 18px 40px rgba(10,37,64,.12); }

            .downloadCard[aria-disabled="true"]:hover { transform: none; }

            .thinCard { padding: 22px; border-radius: 16px; transition: transform .25s ease, box-shadow .25s ease; }
            .thinCard:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(10,37,64,.10); }

            /* Collapsible install guide */
            .installDetails{
              border-top: 1px solid rgba(0,0,0,.08);
              padding-top: 12px;
            }
            .installSummary{
              list-style: none;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              cursor: pointer;
              font-weight: 900;
              color: var(--ink);
              font-size: 14px;
              user-select: none;
            }
            .installSummary::-webkit-details-marker { display: none; }
            .installDetails[open] .chev { transform: rotate(180deg); }
            .chev { transition: transform .15s ease; opacity: .75; }

            .installBody{
              margin-top: 10px;
              background: rgba(255,255,255,.7);
              border: 1px solid rgba(0,0,0,.08);
              border-radius: 14px;
              padding: 14px;
            }
            .installList{
              margin: 0;
              padding-left: 18px;
              color: var(--muted);
              line-height: 1.75;
              font-size: 14px;
            }
            .installNote{
              margin-top: 10px;
              font-size: 13px;
              color: var(--muted);
              background: rgba(13,32,48,.03);
              border: 1px solid rgba(0,0,0,.08);
              padding: 10px 12px;
              border-radius: 12px;
            }
            .ssGrid{
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-top: 12px;
            }
            .ssCard{
              border: 1px solid rgba(0,0,0,.08);
              border-radius: 14px;
              background: #fff;
              padding: 10px;
            }
            .ssTitle{
              font-size: 12px;
              font-weight: 900;
              color: rgba(13,32,48,.85);
              margin: 0 0 8px;
            }

            @keyframes zoomFade { from { opacity: 0; } to { opacity: 1; } }

            @media (max-width: 900px){
              .topGrid{ grid-template-columns: 1fr !important; }
              .trustGrid{ grid-template-columns: 1fr !important; }
              .ssGrid{ grid-template-columns: 1fr !important; }
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
