import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do google',
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
