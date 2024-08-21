import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crie uma conta',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
