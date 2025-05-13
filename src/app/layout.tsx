import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Handshake',
    default: 'Handshake - Your AI-Powered Grocery Shopping Assistant',
  },
  description:
    'Handshake is an autonomous shopping platform that enables you to delegate grocery shopping to an AI agent. Our AI understands your preferences, habits, budgets, and context - completing purchases end-to-end.',
  keywords: ['AI shopping', 'grocery delivery', 'autonomous shopping', 'AI assistant', 'grocery shopping', 'personal shopper'],
  authors: [{ name: 'Handshake' }],
  openGraph: {
    title: 'Handshake - Your AI-Powered Grocery Shopping Assistant',
    description: 'Let our AI handle your grocery shopping. It learns your preferences, manages your budget, and completes purchases automatically.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handshake - Your AI-Powered Grocery Shopping Assistant',
    description: 'Let our AI handle your grocery shopping. It learns your preferences, manages your budget, and completes purchases automatically.',
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
