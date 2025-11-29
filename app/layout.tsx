import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Welcome to Columns',
  description: 'Created with v0',
  icons: {
    icon: [
      {
        url: '/column-removebg-preview.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/column-removebg-preview.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/column-removebg-preview.png',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
