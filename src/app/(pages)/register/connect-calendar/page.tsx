'use client'

import { Box, Button, Heading, MultiStep, Text } from '@ignite-ui-rcnald/react'
import { ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQueryState } from 'nuqs'

import { signInGoogle } from '@/lib/actions'

export default function Page() {
  const { status } = useSession()
  const router = useRouter()
  const [error] = useQueryState('error')

  const hasAuthError = Boolean(error)
  const isSignIn = status === 'authenticated'

  const handleNextStep = () => {
    router.push('/register/time-intervals')
  }

  return (
    <div className="mx-auto mt-24 max-w-[540px]">
      <form action={signInGoogle}>
        <Heading>Conecte sua agenda!</Heading>
        <Text className="text-gray200">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep totalSteps={4} currentStep={2} className="mt-6" />
        <Box className="mt-6 flex flex-col gap-4">
          <Box className="flex items-center justify-between gap-4">
            <Text>Google Calendar</Text>
            {isSignIn ? (
              <Button
                variant="secondary"
                size="sm"
                disabled
                className="hover:disabled:bg-transparent"
              >
                Conectado
                <Check />
              </Button>
            ) : (
              <Button variant="secondary" size="sm">
                Conectar
                <ArrowRight />
              </Button>
            )}
          </Box>
          {hasAuthError ? (
            <Text size="sm" className="text-red-500">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </Text>
          ) : null}

          <Button type="button" onClick={handleNextStep}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Box>
      </form>
    </div>
  )
}
