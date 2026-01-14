// components/Navbar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { links } from "@/lib/links";

type NavItem = { label: string; href: string };

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" }, // correct + clean
      { label: "FEATURES", href: links.features },
      { label: "PRICING", href: links.pricing },
      { label: "DOWNLOAD", href: links.download },
      { label: "SUPPORT", href: links.support },
      { label: "CONTACT", href: links.contact },
    ],
    []
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 80,
        width: "100%",
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,.06)",
        overflow: "hidden", // keep big logo without blowing up header height
      }}
    >
      {/* full-width bar */}
      <div
        style={{
          width: "100%",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          minHeight: 84, // stable navbar height
        }}
      >
        {/* Brand */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            height: 84, // match navbar height
            overflow: "hidden",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
          aria-label="eKasiBooks Home"
        >
          <img
            src="/ekasibooks-logo.png"
            alt="eKasiBooks"
            style={{
              height: 135, // BIG logo stays
              width: "auto",
              display: "block",
              objectFit: "contain",
              transform: "translateY(2px)", // tiny nudge to visually center
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav
          className="navDesktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  fontWeight: 950,
                  letterSpacing: ".08em",
                  fontSize: 12,
                  color: active ? "var(--brand-700)" : "rgba(13,32,48,.78)",
                  padding: "10px 10px",
                  borderRadius: 999,
                  background: active ? "rgba(33,93,99,.10)" : "transparent",
                  border: active ? "1px solid rgba(33,93,99,.18)" : "1px solid transparent",
                  transition: "transform .2s ease, background .2s ease, border .2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="https://portal.ekasibooks.co.za"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid rgba(33,93,99,.22)",
              borderRadius: 999,
              padding: "10px 14px",
              fontWeight: 950,
              letterSpacing: ".08em",
              fontSize: 12,
              textDecoration: "none",
              background: "#fff",
              color: "var(--ink)",
              transition: "transform .2s ease, box-shadow .2s ease",
              boxShadow: "0 8px 20px rgba(10,37,64,.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 14px 26px rgba(10,37,64,.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(10,37,64,.06)";
            }}
          >
            LOGIN
          </a>
        </nav>

        {/* Mobile button */}
        <button
          className="navMobileBtn"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,.08)",
            background: "#fff",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(10,37,64,.06)",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 950 }}>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div
          className="navMobilePanel"
          style={{
            borderTop: "1px solid rgba(0,0,0,.06)",
            background: "rgba(255,255,255,.96)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ padding: 16, display: "grid", gap: 10 }}>
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    fontWeight: 950,
                    letterSpacing: ".08em",
                    fontSize: 12,
                    color: active ? "var(--brand-700)" : "rgba(13,32,48,.85)",
                    padding: "12px 12px",
                    borderRadius: 14,
                    border: "1px solid rgba(0,0,0,.06)",
                    background: active ? "rgba(33,93,99,.10)" : "#fff",
                  }}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="https://portal.ekasibooks.co.za"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                fontWeight: 950,
                letterSpacing: ".08em",
                fontSize: 12,
                color: "#fff",
                padding: "12px 12px",
                borderRadius: 14,
                background: "var(--brand)",
                border: "1px solid rgba(0,0,0,.06)",
                textAlign: "center",
              }}
            >
              LOGIN
            </a>
          </div>
        </div>
      ) : null}

      {/* Responsive switches */}
      <style>{`
        @media (max-width: 920px){
          .navDesktop{ display:none !important; }
          .navMobileBtn{ display:flex !important; }
        }
      `}</style>
    </header>
  );
}
