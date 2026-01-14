// components/StickyCta.tsx
"use client";

import { useEffect, useState } from "react";

export default function StickyCta({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const SHOW_AFTER = 320;
    const HIDE_NEAR_BOTTOM = 650;

    const onScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.scrollHeight - HIDE_NEAR_BOTTOM;

      setVisible(scrolled > SHOW_AFTER && !nearBottom);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick actions"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(0,0,0,.08)",
        boxShadow: "0 -10px 30px rgba(0,0,0,.08)",
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "transform .2s ease, opacity .2s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <a
          href={primaryHref}
          style={{
            borderRadius: 999,
            padding: "12px 18px",
            fontWeight: 900,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--brand)",
            color: "#fff",
            minWidth: 220,
          }}
        >
          {primaryLabel}
        </a>

        <a
          href={secondaryHref}
          style={{
            borderRadius: 999,
            padding: "12px 18px",
            fontWeight: 900,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--brand-700)",
            color: "#fff",
            minWidth: 220,
          }}
        >
          {secondaryLabel}
        </a>
      </div>
    </div>
  );
}
