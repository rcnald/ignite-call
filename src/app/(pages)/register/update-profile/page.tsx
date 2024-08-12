'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  Textarea,
} from '@ignite-ui-rcnald/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/axios'

const updateProfileSchema = z.object({
  bio: z.string().min(1),
})

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export default function Page() {
  const session = useSession()
  const router = useRouter()
  const { register, handleSubmit } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  })

  const handleUpdateProfile = async (data: UpdateProfileSchema) => {
    await api.put('/users/profile', { bio: data.bio })

    router.replace(`/schedule/${session.data?.user.username}`)
  }

  return (
    <div className="mx-auto mt-24 max-w-[540px]">
      <div className="w-full">
        <Heading>Defina sua disponibilidade</Heading>
        <Text className="text-gray200">
          Por último, uma breve descrição e uma foto de perfil.
        </Text>
        <MultiStep totalSteps={4} currentStep={4} className="mt-6" />
        <form id="update-profile" onSubmit={handleSubmit(handleUpdateProfile)}>
          <Box className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={session.data?.user.avatar_url}
                alt={session.data?.user.name ?? ''}
              />
            </div>

            <Text>Sobre você</Text>
            <Textarea {...register('bio')} />
            <Text className="text-gray200">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </Text>

            <Button form="update-profile" type="submit">
              Finalizar
              <ArrowRight />
            </Button>
          </Box>
        </form>
      </div>
    </div>
  )
}
