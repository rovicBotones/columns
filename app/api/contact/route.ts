import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactMessage = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  website?: unknown
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
  const body = payload as ContactMessage

  // Silently accept bot submissions caught by the hidden honeypot.
  if (cleanText(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = cleanText(body.name, 100)
  const email = cleanText(body.email, 254)
  const subject = cleanText(body.subject, 150).replace(/[\r\n]+/g, " ")
  const message = cleanText(body.message, 5000)

  if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide valid contact details and a message." }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpAppPassword = process.env.SMTP_APP_PASSWORD
  const recipient = process.env.CONTACT_EMAIL

  if (!smtpUser || !smtpAppPassword || !recipient) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 503 })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpAppPassword.replace(/\s/g, ""),
      },
    })

    await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio message: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const smtpError = error as { code?: string; responseCode?: number }
    const errorMessage = smtpError.code === "EAUTH" || smtpError.responseCode === 535
      ? "Gmail rejected the SMTP credentials. Check SMTP_USER and the Gmail app password."
      : smtpError.code === "ETIMEDOUT" || smtpError.code === "ECONNECTION"
        ? "Could not connect to Gmail SMTP. Check the server's network access and try again."
        : `Gmail could not send the message${smtpError.responseCode ? ` (SMTP ${smtpError.responseCode})` : ""}. Check the account and recipient settings.`

    return NextResponse.json({ error: errorMessage }, { status: 502 })
  }
}
