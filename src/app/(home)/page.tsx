'use client'

import { Heading, Text } from '@ignite-ui-rcnald/react'
import Image from 'next/image'

import preview from '@/assets/app-preview.png'

import { ClaimUserForm } from './components/claim-user-form'

export default function Home() {
  return (
    <div className="ml-auto flex min-h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center justify-center gap-20">
      <div className="p-4">
        <Heading as="h1" size="4xl" className="max-sm:text-6xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl" className="mt-2 text-gray200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUserForm />
      </div>
      <div className="overflow-hidden pr-8 max-sm:hidden">
        <Image
          src={preview}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
          className="max-w-none"
        />
      </div>
    </div>
  )
}
