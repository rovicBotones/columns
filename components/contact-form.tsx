"use client"

import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"

type FormStatus = "idle" | "sending" | "success" | "error"

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const result = await response.json().catch(() => ({})) as { error?: string }
      if (!response.ok) {
        throw new Error(result.error ?? "Could not send your message. Please try again.")
      }

      form.reset()
      setStatus("success")
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not send your message. Please try again.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="border-y border-border bg-muted/50 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Get in touch</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Have a project in mind?</h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">Send me a message and I will get back to you by email.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" aria-label="Send me a message">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              <span>Your name</span>
              <input name="name" autoComplete="name" required maxLength={100} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-foreground" />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-foreground" />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-medium">
            <span>Subject</span>
            <input name="subject" required maxLength={150} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-foreground" />
          </label>
          <label className="block space-y-2 text-sm font-medium">
            <span>Message</span>
            <textarea name="message" required rows={5} maxLength={5000} className="w-full resize-y rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-foreground" />
          </label>
          <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-80 disabled:cursor-wait disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send message"}
              <Send size={16} aria-hidden="true" />
            </button>
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {status === "success" && "Message sent. Thanks for reaching out!"}
              {status === "error" && errorMessage}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
