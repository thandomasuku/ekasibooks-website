// components/ContactClient.tsx
"use client";

import { useEffect, useState } from "react";
import StickyCta from "@/components/StickyCta";

type Status = "idle" | "success" | "error";

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 120);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const formEl = e.currentTarget;

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const form = new FormData(formEl);

    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      message: String(form.get("message") || "").trim(),
      company: String(form.get("company") || "").trim(), // honeypot
    };

    // Basic client validation
    if (!payload.email || !payload.message) {
      setLoading(false);
      setStatus("error");
      setErrorMsg("Please fill in your email and message.");
      return;
    }

    // Honeypot filled → pretend success (anti-bot)
    if (payload.company) {
      setLoading(false);
      setStatus("success");
      formEl.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: payload.message,
          company: "", // keep honeypot empty
        }),
      });

      const data: any = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok !== true) {
        console.error("Contact API error:", res.status, data);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      formEl.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          background:
            "radial-gradient(1000px 600px at 10% 0%, rgba(255,255,255,.16), transparent 60%), linear-gradient(135deg, var(--brand-700) 0%, var(--brand) 100%)",
        }}
      >
        <div className="container reveal" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h1 className="h1 center" style={{ color: "#fff" }}>
            Let’s talk
          </h1>
          <p
            className="center"
            style={{
              color: "#e7f3f4",
              marginTop: 16,
              fontSize: 18,
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            Billing, pricing, or support — we’ll get you sorted quickly.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="container" style={{ maxWidth: 1280 }}>
          <p className="center muted reveal" style={{ marginBottom: 48 }}>
            We usually reply within one business day.
          </p>

          <div className="contactGrid">
            {/* FORM */}
            <div className="card reveal" id="contact-form">
              <h2 className="h3">Send us a message</h2>
              <p className="muted">Our team will get back to you.</p>

              <form className="contactForm" onSubmit={handleSubmit}>
                {/* Honeypot (spam protection) */}
                <input
                  type="text"
                  name="company"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <input name="name" placeholder="Your name" required />
                <input name="email" type="email" placeholder="Your email" required />
                <textarea name="message" rows={6} placeholder="How can we help?" required />

                <button type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Send message"}
                </button>

                {status === "success" && (
                  <p className="muted small" style={{ marginTop: 10, color: "#0f766e" }}>
                    Message sent successfully.
                  </p>
                )}

                {status === "error" && (
                  <p className="muted small" style={{ marginTop: 10, color: "#b91c1c" }}>
                    {errorMsg || "Failed to send message. Please try again."}
                  </p>
                )}
              </form>

              <p className="muted small">
                By submitting, you agree to our <a href="/privacy">Privacy Policy</a>.
              </p>
            </div>

            {/* CONTACT OPTIONS */}
            <div className="reveal">
              <h2 className="h3">Contact options</h2>

              <div className="grid3">
                <div className="thinCard iconCard">
                  <span className="icon">📧</span>
                  <strong>Sales</strong>
                  <a href="mailto:sales@ekasibooks.co.za">sales@ekasibooks.co.za</a>
                  <p className="muted">Licensing & pricing</p>
                </div>

                <div className="thinCard iconCard">
                  <span className="icon">🛠️</span>
                  <strong>Support</strong>
                  <a href="mailto:support@ekasibooks.co.za">support@ekasibooks.co.za</a>
                  <p className="muted">Product help</p>
                </div>

                <div className="thinCard iconCard">
                  <span className="icon">💬</span>
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/27823403945" target="_blank" rel="noopener noreferrer">
                    Chat with us
                  </a>
                  <p className="muted">Mon–Fri, 09:00–17:00</p>
                </div>
              </div>

              {/* DEMO CTA */}
              <div className="demoCta reveal">
                <h3>Prefer a quick walkthrough?</h3>
                <p className="muted">Book a short demo and see how eKasiBooks fits your business.</p>

                {/* ✅ was /contact (loop). Now jumps to the form */}
                <a href="#contact-form" className="demoBtn">
                  Book a demo
                </a>
              </div>
            </div>
          </div>

          {/* STYLES */}
          <style>{`
            .contactGrid {
              display: grid;
              grid-template-columns: 1.1fr 0.9fr;
              gap: 64px;
              align-items: start;
            }

            /* Scope form styling so it doesn't break navbar/back-to-top buttons */
            .contactForm {
              display: grid;
              gap: 18px;
              margin-top: 20px;
            }

            .contactForm input,
            .contactForm textarea {
              padding: 16px 18px;
              border-radius: 16px;
              border: 1px solid var(--ring);
            }

            .contactForm input:focus,
            .contactForm textarea:focus {
              outline: none;
              border-color: var(--brand);
              box-shadow: 0 0 0 3px rgba(33,93,99,.15);
            }

            .contactForm button {
              margin-top: 12px;
              border-radius: 999px;
              padding: 16px 22px;
              font-weight: 900;
              background: var(--brand);
              color: #fff;
              border: none;
              cursor: pointer;
              transition: transform .2s ease, opacity .2s ease;
            }

            .contactForm button:active {
              transform: scale(.97);
            }

            .contactForm button:disabled {
              opacity: .7;
              cursor: not-allowed;
            }

            .grid3 {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-top: 24px;
            }

            .thinCard {
              padding: 24px;
              border-radius: 16px;
              transition: transform .25s ease, box-shadow .25s ease;
              word-break: break-word;
              overflow-wrap: anywhere;
            }

            .iconCard .icon {
              display: inline-block;
              font-size: 22px;
              margin-bottom: 6px;
              transition: transform .3s ease;
            }

            .iconCard:hover .icon {
              transform: translateY(-4px);
            }

            .card:hover,
            .thinCard:hover {
              transform: translateY(-4px);
              box-shadow: 0 18px 40px rgba(10,37,64,.12);
            }

            .demoCta {
              margin-top: 48px;
              padding: 32px;
              border-radius: 20px;
              background: linear-gradient(135deg, rgba(33,93,99,.08), rgba(33,93,99,.04));
            }

            .demoBtn {
              display: inline-block;
              margin-top: 12px;
              padding: 14px 20px;
              border-radius: 999px;
              background: var(--brand);
              color: #fff;
              font-weight: 900;
              text-decoration: none;
            }

            /* REVEAL ANIMATION */
            .reveal {
              opacity: 0;
              transform: translateY(20px);
              transition: all .6s ease;
            }

            .reveal.show {
              opacity: 1;
              transform: translateY(0);
            }

            @media (max-width: 992px){
              .contactGrid { grid-template-columns: 1fr; gap: 32px; }
              .grid3 { grid-template-columns: 1fr; }
            }
          `}</style>
        </div>
      </section>

      <StickyCta
        primaryHref="/download"
        primaryLabel="Download eKasiBooks"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
    </main>
  );
}
