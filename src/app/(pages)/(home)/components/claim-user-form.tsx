'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Input } from '@ignite-ui-rcnald/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface ClaimUserFormProps {}

const claimUserFormSchema = z.object({
  username: z.string(),
})

type ClaimUserForm = z.infer<typeof claimUserFormSchema>

export function ClaimUserForm({ ...props }: ClaimUserFormProps) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<ClaimUserForm>({
    resolver: zodResolver(claimUserFormSchema),
  })

  const handlePreRegister = async (data: ClaimUserForm) => {
    const { username } = data
    if (username) router.push(`/register?username=${username}`)
  }

  return (
    <Box {...props} className="mt-4 p-4">
      <form
        onSubmit={handleSubmit(handlePreRegister)}
        className="grid w-full grid-cols-[1fr_auto] gap-2 max-sm:grid-cols-1"
      >
        <Input
          prefix="ignite.com/"
          placeholder="seu-usuário"
          type="text"
          className="flex"
          {...register('username')}
        />
        <Button size="md" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </form>
    </Box>
  )
}
