import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade',
  robots: {
    index: false,
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
