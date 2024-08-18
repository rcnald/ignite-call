'use client'

import { Box, Text } from '@ignite-ui-rcnald/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

import { Calendar } from '../ui/calendar'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { username } = useParams<{ username: string }>()

  const isDateSelected = Boolean(selectedDate)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const day = selectedDate ? dayjs(selectedDate).format('DD') : null
  const month = selectedDate ? dayjs(selectedDate).format('MMMM') : null

  const { data: availability } = useQuery({
    queryKey: ['availability', selectedDate],
    queryFn: async () => {
      if (!isDateSelected) return undefined

      const response = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: { date: dayjs(selectedDate).format('YYYY-MM-DD') },
        },
      )

      return response.data
    },
  })

  return (
    <Box
      className={cn('relative mx-auto mt-6 grid max-w-full p-0', {
        'grid-cols-[1fr_280px] max-lg:grid-cols-1': isDateSelected === true,
        'w-[540px] grid-cols-1': isDateSelected === false,
      })}
    >
      <Calendar onDateSelected={setSelectedDate} />
      {isDateSelected ? (
        <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-gray600 p-6 pb-0">
          <Text className="font-medium">
            {weekDay}{' '}
            <span className="text-gray200">
              {day} de {month}
            </span>
          </Text>
          <div className="mt-3 grid grid-cols-1 gap-2 max-lg:grid-cols-2">
            {availability?.possibleTimes.map((time) => {
              const isTimesReserved =
                !availability.availableTimes.includes(time)

              return (
                <button
                  key={time}
                  disabled={isTimesReserved}
                  className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500"
                >
                  {time}:00h
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </Box>
  )
}
