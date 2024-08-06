'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  MultiStep,
  Text,
} from '@ignite-ui-rcnald/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/axios'
import { convertTimeStringToMinutes, getWeekDays } from '@/lib/utils'

const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enable: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enable === true),
    )
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar um dia ao menos',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,

          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsInput = z.input<typeof timeIntervalsSchema>
type TimeIntervalsOutput = z.output<typeof timeIntervalsSchema>

export default function Page() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    control,
  } = useForm<TimeIntervalsInput, unknown, TimeIntervalsOutput>({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enable: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const handleSetTimeIntervals = async ({ intervals }: TimeIntervalsOutput) => {
    await api.post('/users/time-intervals', { intervals })

    router.push('/register/update-profile')
  }

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const intervals = watch('intervals')

  const weekDays = getWeekDays()

  return (
    <div className="mx-auto mt-24 max-w-[540px]">
      <div className="w-full">
        <Heading>Quase lá</Heading>
        <Text className="text-gray200">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep totalSteps={4} currentStep={3} className="mt-6" />
        <Box className="mt-6 flex flex-col gap-4">
          <Box className="flex items-center justify-between gap-4 p-0">
            <form
              id="intervals-form"
              onSubmit={handleSubmit(handleSetTimeIntervals)}
              className="flex w-full flex-col divide-y-2 divide-gray600"
            >
              {fields.map(({ id, weekDay, enable }, index) => {
                return (
                  <div className="flex w-full justify-between p-4" key={id}>
                    <label htmlFor={id} className="flex items-center gap-3">
                      <Controller
                        control={control}
                        name={`intervals.${index}.enable`}
                        render={({ field: { value, onChange } }) => (
                          <Checkbox
                            id={id}
                            checked={value}
                            onCheckedChange={(checked) =>
                              onChange(checked === true)
                            }
                            defaultChecked={enable}
                          />
                        )}
                      />

                      <Text className="text-gray100">{weekDays[weekDay]}</Text>
                    </label>

                    <div className="flex gap-3">
                      <Input
                        placeholder="9:00h"
                        type="time"
                        step={60}
                        disabled={!intervals[index].enable}
                        className="[&_input::-webkit-calendar-picker-indicator]:brightness-[0.3] [&_input::-webkit-calendar-picker-indicator]:invert"
                        {...register(`intervals.${index}.startTime`)}
                      />
                      <Input
                        placeholder="17:00h"
                        type="time"
                        step={60}
                        disabled={!intervals[index].enable}
                        className="[&_input::-webkit-calendar-picker-indicator]:brightness-[0.3] [&_input::-webkit-calendar-picker-indicator]:invert"
                        {...register(`intervals.${index}.endTime`)}
                      />
                    </div>
                  </div>
                )
              })}
            </form>
          </Box>

          {errors.intervals ? (
            <Text size="sm" className="flex text-red-600">
              {errors.intervals.root?.message}
            </Text>
          ) : null}

          <Button form="intervals-form" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Box>
      </div>
    </div>
  )
}
