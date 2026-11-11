import Link from "next/link"
import { ActivityLogViewer } from "@/components/activity-log"

export const metadata = {
  title: "System Activity | Rovic Joy Botones",
  robots: { index: false, follow: false },
}

export default function StatusServicePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline underline-offset-4 hover:text-foreground">← Back to portfolio</Link>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">System status</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Activity log</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Recorded portfolio access and interaction events with their server timestamps.</p>
        <section aria-label="Recorded activity" className="mt-10">
          <ActivityLogViewer />
        </section>
      </article>
    </main>
  )
}
