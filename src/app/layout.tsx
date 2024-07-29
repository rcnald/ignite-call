import '@ignite-ui-rcnald/react/dist/globals.css'
import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const roboto = Roboto({ subsets: ['latin'], weight: ['500', '400', '700'] })

export const metadata: Metadata = {
  title: 'Ignite call',
  description: 'Generated by create next app',
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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
