// app/api/ticket/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type TicketPayload = {
  name?: string;
  email: string;
  subject: string;
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

    const SUPPORT_TO = process.env.SUPPORT_TO || "support@ekasibooks.co.za";
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || "support@ekasibooks.co.za";
    const FROM_NAME = process.env.FROM_NAME || "eKasiBooks Support";

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

    let body: TicketPayload;
    try {
      body = (await req.json()) as TicketPayload;
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const subject = (body?.subject || "").trim();
    const message = (body?.message || "").trim();
    const company = (body?.company || "").trim(); // honeypot

    // Honeypot: if filled, silently succeed
    if (company) return NextResponse.json({ ok: true });

    if (!email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Email, subject, and message are required." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    const secure = SMTP_PORT === 465; // 465 usually secure, 587 usually STARTTLS
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Optional quick sanity check (can comment out later)
    await transporter.verify();

    const safeName = name || "Support Ticket";
    const mailSubject = `[eKasiBooks Ticket] ${subject}`;

    const textBody =
      `New Support Ticket\n\n` +
      `From: ${safeName} <${email}>\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n`;

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: SUPPORT_TO,
      replyTo: email,
      subject: mailSubject,
      text: textBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Ticket route error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
