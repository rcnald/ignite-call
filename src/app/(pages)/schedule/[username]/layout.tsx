import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { username: string }
}): Promise<Metadata> {
  const { username } = params

  return {
    title: `Agendar com ${username}`,
  }
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { username: string }
}>) {
  return children
}
