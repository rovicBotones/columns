import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Rovic Joy Botones | Full-Stack Software Engineer',
  description: 'Portfolio of Rovic Joy Botones, a full-stack software engineer working with .NET, React Native, React, and L3 application support.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
