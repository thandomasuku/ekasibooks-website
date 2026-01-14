// components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 46,
        height: 46,
        borderRadius: 8, // <- square-ish like your example
        border: "1px solid rgba(255,255,255,.18)",
        background: "var(--brand)",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 12px 26px rgba(0,0,0,.18)",
        zIndex: 60,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform .18s ease, box-shadow .18s ease, filter .18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 18px 34px rgba(0,0,0,.22)";
        e.currentTarget.style.filter = "brightness(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,.18)";
        e.currentTarget.style.filter = "none";
      }}
    >
      {/* chevron up (matches your screenshot style) */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 14l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
