// components/Navbar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "@/lib/links";

type NavItem = {
  label: "HOME" | "FEATURES" | "PRICING" | "DOWNLOAD" | "SUPPORT" | "CONTACT" | string;
  href: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" },
      { label: "FEATURES", href: links.features },
      { label: "PRICING", href: links.pricing },
      { label: "DOWNLOAD", href: links.download },
      { label: "SUPPORT", href: links.support },
      { label: "CONTACT", href: links.contact },
    ],
    []
  );

  // Escape closes menu (allowed: event handler, not effect body calling setState unconditionally)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll when mobile menu is open (allowed: syncing external system)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Close menu only in direct user actions (avoids setState-in-effect lint rule)
  const closeMenu = () => setOpen(false);

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
        overflow: "hidden",
      }}
    >
      {/* full-width bar */}
      <div
        className="navBarInner"
        style={{
          width: "100%",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 16,
          minHeight: 84,
        }}
      >
        {/* Mobile button */}
        <button
          className="navMobileBtn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            border: "1px solid rgba(33,93,99,.22)",
            background: "#fff",
            color: "var(--brand)",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(10,37,64,.06)",
            flex: "0 0 auto",
          }}
        >
          {/* Custom hamburger so we can control thickness/size */}
          <span
            aria-hidden="true"
            className={open ? "hamburger isOpen" : "hamburger"}
            style={{
              width: 26,
              height: 18,
              display: "grid",
              alignContent: "center",
              gap: 5,
            }}
          >
            <span className="hamburgerLine" />
            <span className="hamburgerLine" />
            <span className="hamburgerLine" />
          </span>

          {/* Screen-reader text fallback */}
          <span
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="navBrand"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            height: 84,
            overflow: "hidden",
            textDecoration: "none",
            whiteSpace: "nowrap",
            margin: 0,
            justifyContent: "flex-start",
          }}
          aria-label="eKasiBooks Home"
        >
          <img
            src="/ekasibooks-logo.png"
            alt="eKasiBooks"
            style={{
              height: 135,
              width: "auto",
              display: "block",
              objectFit: "contain",
              transform: "translateY(2px)",
            }}
          />
        </Link>

        {/* Spacer pushes everything else to the right */}
        <div className="navSpacer" style={{ flex: 1 }} />

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
            const commonStyle: React.CSSProperties = {
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
            };

            // Most of your nav items are internal routes; use Link for internal
            if (item.href.startsWith("/")) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={commonStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                >
                  {item.label}
                </Link>
              );
            }

            // Fallback for any external hrefs
            return (
              <a
                key={item.href}
                href={item.href}
                style={commonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {item.label}
              </a>
            );
          })}

          {/* LOGIN (UNCHANGED SIZE/STYLES) */}
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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
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
                </Link>
              );
            })}

            {/* LOGIN (UNCHANGED SIZE/STYLES) */}
            <a
              href="https://portal.ekasibooks.co.za"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
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

      {/* Responsive switches + hamburger styling */}
      <style>{`
        .hamburgerLine{
          height: 3px;
          border-radius: 999px;
          background: var(--brand);
          width: 100%;
          display: block;
          transition: transform .18s ease, opacity .18s ease;
        }

        /* Animate into an X when open */
        .hamburger.isOpen .hamburgerLine:nth-child(1){
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger.isOpen .hamburgerLine:nth-child(2){
          opacity: 0;
        }
        .hamburger.isOpen .hamburgerLine:nth-child(3){
          transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 920px){
          .navDesktop{ display:none !important; }
          .navMobileBtn{ display:flex !important; order: 0; }
          .navBrand{ order: 1; }
          .navSpacer{ order: 2; }

          /* Pull content closer to edges on mobile */
          .navBarInner{
            padding-left: 10px !important;
            padding-right: 10px !important;
            gap: 12px !important;
          }

          /* Make the button even more tappable on small screens */
          .navMobileBtn{
            width: 54px !important;
            height: 54px !important;
          }
        }
      `}</style>
    </header>
  );
}
