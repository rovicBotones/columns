import { NextResponse } from "next/server"

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

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const recipient = process.env.CONTACT_EMAIL

  if (!apiKey || !from || !recipient) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 503 })
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio message: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Email service could not send the message." }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Email service is unavailable." }, { status: 502 })
  }
}
