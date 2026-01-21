// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "sticky",
        top: "100vh",
        padding: "48px 0 56px",
        background:
          "radial-gradient(600px 120px at 50% 0%, rgba(159,227,232,.18), transparent 70%), linear-gradient(180deg, #0f2f33 0%, #0c2629 100%)",
        borderTop: "1px solid rgba(255,255,255,.08)",
        color: "rgba(255,255,255,.85)",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gap: 24,
          textAlign: "center",
        }}
      >
        {/* Page links */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            fontSize: 14,
          }}
        >
          <a href="/privacy" className="footerLink">
            Privacy Policy
          </a>
          <a href="/terms" className="footerLink">
            Terms & Conditions
          </a>
          <a href="/support" className="footerLink">
            Support
          </a>
          <a href="/contact" className="footerLink">
            Contact
          </a>
        </nav>

        {/* Icon-only social row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Email */}
          <a
            className="footerIcon"
            href="mailto:support@ekasibooks.co.za"
            aria-label="Email support"
            title="Email support"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V6.5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6 7.5L12 12L18 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            className="footerIcon"
            href="https://wa.me/27823403945"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20 11.8C20 16.2 16.2 20 11.8 20C10.6 20 9.4 19.7 8.4 19.2L4 20L4.8 15.8C4.3 14.8 4 13.6 4 12.4C4 8 7.8 4.2 12.2 4.2C16.6 4.2 20 7.4 20 11.8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9.2 9.3C9.4 9.1 9.6 9 9.8 9H10.3C10.5 9 10.7 9.1 10.8 9.3L11.5 10.7C11.6 10.9 11.6 11.2 11.4 11.4L10.9 11.9C11.5 13 12.4 13.8 13.6 14.4L14.1 13.9C14.3 13.7 14.6 13.7 14.8 13.8L16.2 14.5C16.4 14.6 16.5 14.8 16.5 15V15.5C16.5 15.7 16.4 15.9 16.2 16.1C15.7 16.6 15 16.8 14.3 16.6C11.7 15.8 9.6 13.7 8.8 11.1C8.6 10.4 8.8 9.7 9.2 9.3Z"
                fill="currentColor"
              />
            </svg>
          </a>

          {/* Website */}
          <a
            className="footerIcon"
            href="https://oitsolutions.co.za"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            title="Website"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M3.5 12H20.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 3C9.5 5.7 8 8.7 8 12C8 15.3 9.5 18.3 12 21C14.5 18.3 16 15.3 16 12C16 8.7 14.5 5.7 12 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p style={{ margin: 0, fontSize: 14, opacity: 0.92 }}>
          © {year} eKasiBooks • Quotations • Invoices • Statements
        </p>

        {/* Attribution */}
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>
          A product of{" "}
          <a
            href="https://oitsolutions.co.za"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#9fe3e8",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Onkabetse IT Solutions
          </a>
        </p>
      </div>

      {/* Hover glow + icon styling */}
      <style>{`
        .footerLink{
          color: rgba(255,255,255,.80);
          text-decoration: none;
          transition: color .2s ease, text-shadow .2s ease;
        }
        .footerLink:hover{
          color: rgba(255,255,255,.95);
          text-shadow: 0 0 18px rgba(159,227,232,.35);
        }

        .footerIcon{
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,.88);
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          box-shadow: 0 10px 22px rgba(0,0,0,.18);
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
          text-decoration: none;
        }
        .footerIcon:hover{
          transform: translateY(-3px);
          background: rgba(159,227,232,.10);
          color: rgba(255,255,255,.98);
          box-shadow: 0 16px 32px rgba(0,0,0,.22);
        }
        .footerIcon:active{
          transform: translateY(-1px);
        }

        @media (max-width: 520px){
          .footerIcon{
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </footer>
  );
}
