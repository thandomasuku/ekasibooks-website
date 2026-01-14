"use client";

export default function SupportTicketForm() {
  return (
    <form
      action="#"
      method="post"
      style={{ display: "grid", gap: 12, marginTop: 12 }}
      onSubmit={(e) => {
        e.preventDefault();
        alert("Ticket form is connected next (email / portal). For now, use Email Support.");
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 900 }}>Email</label>
        <input
          required
          type="email"
          placeholder="you@company.com"
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
          type="text"
          placeholder="What can we help you with?"
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
          rows={5}
          placeholder="Describe the issue. Include version, steps, and any error messages."
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
          style={{
            borderRadius: 999,
            padding: "12px 16px",
            fontWeight: 950,
            border: "1px solid rgba(0,0,0,.08)",
            background: "var(--brand)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit ticket
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
    </form>
  );
}
