'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Input, Text, Textarea } from '@ignite-ui-rcnald/react'
import { Calendar, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'O email deve ser um email valido' }),
  observations: z.string().nullable(),
})

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })

  const handleConfirmScheduling = () => {}

  return (
    <Box className="mx-auto mt-6 max-w-[540px]">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(handleConfirmScheduling)}
      >
        <div className="mb-2 flex items-center gap-4 border-b border-gray600 pb-6">
          <Text className="flex items-center gap-2">
            <Calendar className="size-5 text-gray200" />
            22 de setembro de 2022
          </Text>
          <Text className="flex items-center gap-2">
            <Clock className="size-5 text-gray200" />
            18:00h
          </Text>
        </div>

        <label className="flex flex-col gap-2">
          <Text size="sm">Nome completo</Text>
          <Input placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <span className="text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Endereço email</Text>
          <Input
            type="email"
            placeholder="jonhdoe@example.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-700">{errors.email.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Observações</Text>
          <Textarea className="h-fit" {...register('observations')} />
        </label>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </div>
      </form>
    </Box>
  )
}
