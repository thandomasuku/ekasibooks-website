// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email: string;
  message: string;
  company?: string; // honeypot
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const CONTACT_TO = process.env.CONTACT_TO || "sales@ekasibooks.co.za";
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || "info@ekasibooks.co.za";
    const FROM_NAME = process.env.FROM_NAME || "eKasiBooks";

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing SMTP env vars. Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS",
        },
        { status: 500 }
      );
    }

    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const message = (body?.message || "").trim();
    const company = (body?.company || "").trim(); // honeypot

    // Honeypot → silently succeed
    if (company) return NextResponse.json({ ok: true });

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Email and message are required." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const secure = SMTP_PORT === 465;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.verify();

    const senderName = name || "Website contact";
    const subject = "New contact form submission";

    const textBody =
      `New Contact Message\n\n` +
      `From: ${senderName} <${email}>\n\n` +
      `Message:\n${message}\n`;

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text: textBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
