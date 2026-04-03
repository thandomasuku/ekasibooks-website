"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  const phone = "27822084992"; // replace
  const message = encodeURIComponent("Hi, I’d like to know more about eKasiBooks.");
  const url = `https://wa.me/${phone}?text=${message}`;

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);

      setTimeout(() => {
        setPulse(true);

        setTimeout(() => setPulse(false), 1200);
      }, 900);
    }, 1500);

    return () => clearTimeout(showTimer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Need help? WhatsApp us"
        onClick={() => {
          trackEvent("whatsapp_click", {
            location: "floating_button",
            page: window.location.pathname,
          });
        }}
        style={{
          position: "fixed",
          right: 16,
          bottom: 118,
          zIndex: 999,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#25D366",
          color: "#fff",
          padding: "9px 13px",
          borderRadius: 999,
          fontWeight: 900,
          fontSize: 12.5,
          textDecoration: "none",
          boxShadow: "0 10px 25px rgba(0,0,0,.18)",
          transition: "transform .2s ease, box-shadow .2s ease",
          animation: "waFadeUp 1s ease-out forwards",
        }}
        className={pulse ? "waPulse" : ""}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 16px 34px rgba(0,0,0,.22)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";
        }}
      >
        <span aria-hidden>💬</span>
        <span>Need help? WhatsApp us</span>
      </a>

      <style>{`
        @keyframes waFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes waPulse {
          0% { transform: scale(1); }
          40% { transform: scale(1.06); }
          70% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }

        .waPulse {
          animation: waPulse 0.8s ease;
        }

        @media (max-width: 600px) {
          a[aria-label="Need help? WhatsApp us"] {
            bottom: 128px !important;
            right: 14px !important;
          }
        }
      `}</style>
    </>
  );
}