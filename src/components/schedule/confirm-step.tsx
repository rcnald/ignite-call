'use client'

import { Box, Button, Input, Text, Textarea } from '@ignite-ui-rcnald/react'
import { Calendar, Clock } from 'lucide-react'

export function ConfirmStep() {
  const handleConfirmScheduling = () => {}

  return (
    <Box className="mx-auto mt-6 max-w-[540px]">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleConfirmScheduling}
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
          <Input placeholder="Seu nome" />
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Endereço email</Text>
          <Input type="email" placeholder="jonhdoe@example.com" />
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Observações</Text>
          <Textarea className="h-fit" />
        </label>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit">Confirmar</Button>
        </div>
      </form>
    </Box>
  )
}
