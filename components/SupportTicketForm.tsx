"use client";

import { useState } from "react";

type Status = "idle" | "success" | "error";

export default function SupportTicketForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const formEl = e.currentTarget;

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const form = new FormData(formEl);

    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();
    const company = String(form.get("company") || "").trim(); // honeypot

    // ✅ stronger validation
    if (!email || !subject || !message) {
      setLoading(false);
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setLoading(false);
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // ✅ anti-spam honeypot
    if (company) {
      setLoading(false);
      setStatus("success");
      formEl.reset();
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          email,
          subject,
          message,
          company: "",
        }),
      });

      clearTimeout(timeout);

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      formEl.reset();
    } catch (err) {
      console.error(err);

      if (err instanceof DOMException && err.name === "AbortError") {
        setErrorMsg("Request timed out. Please try again.");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Failed to submit ticket.");
      }

      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      style={{ display: "grid", gap: 12, marginTop: 12 }}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot (spam protection) */}
      <input
        type="text"
        name="company"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 900 }}>Email</label>
        <input
          required
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          disabled={loading}
          style={{
            borderRadius: 12,
            border: "1px solid var(--ring)",
            padding: "12px 12px",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 900 }}>Subject</label>
        <input
          required
          name="subject"
          type="text"
          placeholder="What can we help you with?"
          disabled={loading}
          style={{
            borderRadius: 12,
            border: "1px solid var(--ring)",
            padding: "12px 12px",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 900 }}>Message</label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Describe the issue. Include version, steps, and any error messages."
          disabled={loading}
          style={{
            borderRadius: 12,
            border: "1px solid var(--ring)",
            padding: "12px 12px",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            borderRadius: 999,
            padding: "12px 16px",
            fontWeight: 950,
            border: "1px solid rgba(0,0,0,.08)",
            background: "var(--brand)",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Submitting…" : "Submit ticket"}
        </button>

        <a
          href="mailto:support@ekasibooks.co.za?subject=eKasiBooks%20Support%20Request"
          style={{
            borderRadius: 999,
            padding: "12px 16px",
            fontWeight: 900,
            border: "1px solid rgba(0,0,0,.08)",
            background: "#fff",
            color: "var(--ink)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Or email us
        </a>
      </div>

      {status === "success" && (
        <p style={{ marginTop: 6, fontSize: 13, color: "#0f766e", fontWeight: 700 }}>
          Ticket submitted — we’ll email you back soon.
        </p>
      )}

      {status === "error" && (
        <p style={{ marginTop: 6, fontSize: 13, color: "#b91c1c", fontWeight: 700 }}>
          {errorMsg || "Failed to submit ticket. Please try again."}
        </p>
      )}
    </form>
  );
}