'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Heading,
  Input,
  MultiStep,
  Text,
} from '@ignite-ui-rcnald/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'

export interface RegisterParams {
  searchParams: { username: string }
}

const registerFormSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export default function Page({ searchParams }: RegisterParams) {
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: 'rcnald',
    },
  })

  const handleRegister = async (data: RegisterFormSchema) => {
    try {
      await registerUser({ name: data.name, username: data.username })

      router.push('register/connect-calendar')
    } catch {}
  }

  const { username } = searchParams

  useEffect(() => {
    if (username) setValue('username', username)
  }, [username, setValue])

  return (
    <div className="mx-auto mt-24 max-w-[540px]">
      <form onSubmit={handleSubmit(handleRegister)}>
        <Heading>Bem-vindo ao Ignite Call!</Heading>
        <Text className="text-gray200">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep totalSteps={4} currentStep={1} className="mt-6" />
        <Box className="mt-6 flex flex-col gap-4">
          <label htmlFor="" className="flex flex-col gap-2">
            <Text>Nome de usuário</Text>
            <Input
              prefix="cal.com/"
              placeholder="seu-usuário"
              {...register('username')}
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-2">
            <Text>Nome completo</Text>
            <Input placeholder="seu nome" {...register('name')} />
          </label>
          <Button>
            Próximo passo
            <ArrowRight />
          </Button>
        </Box>
      </form>
    </div>
  )
}
