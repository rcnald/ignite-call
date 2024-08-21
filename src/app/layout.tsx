import '@ignite-ui-rcnald/react/dist/globals.css'
import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { QueryClient } from '@/context/react-query'

const roboto = Roboto({ subsets: ['latin'], weight: ['500', '400', '700'] })

export const metadata: Metadata = {
  title: { default: 'Ignite call', template: '%s | Ignite call' },
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={(roboto.className, 'min-h-screen bg-gray900 text-gray100')}
      >
        <QueryClient>
          <SessionProvider>{children}</SessionProvider>
        </QueryClient>
      </body>
    </html>
  )
}
