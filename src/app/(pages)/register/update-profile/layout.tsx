import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atualize seu perfil',
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
