import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Handshake',
    default: 'Handshake - Your AI Personal Shopper',
  },
  description:
    "Let our agents handle your grocery shopping. From the weekly shop to the kids sports equipment - it does the time-consuming stuff perfectly so you don't have to.",
  keywords: ['AI shopping', 'grocery delivery', 'autonomous shopping', 'AI assistant', 'grocery shopping', 'personal shopper'],
  authors: [{ name: 'Handshake' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Handshake - Your AI Personal Shopper',
    description: "Let our agents handle your grocery shopping. From the weekly shop to the kids sports equipment - it does the time-consuming stuff perfectly so you don't have to.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handshake - Your AI Personal Shopper',
    description: "Let our agents handle your grocery shopping. From the weekly shop to the kids sports equipment - it does the time-consuming stuff perfectly so you don't have to.",
  }
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  )
}
