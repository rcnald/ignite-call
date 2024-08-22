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

interface CalendarProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { username } = useParams<{ username: string }>()

  const isDateSelected = Boolean(selectedDate)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const day = selectedDate ? dayjs(selectedDate).format('DD') : null
  const month = selectedDate ? dayjs(selectedDate).format('MMMM') : null

  const handleSelectTime = (hour: number) => {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateTime)
  }

  const { data: availability } = useQuery({
    queryKey: ['availability', selectedDate],
    queryFn: async () => {
      if (!isDateSelected) return undefined

      const response = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
            timezoneOffset: selectedDate ? selectedDate.getTimezoneOffset() : 0,
          },
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
        <div className="border-l border-gray600 p-6 pb-0">
          <Text className="font-medium">
            {weekDay}{' '}
            <span className="text-gray200">
              {day} de {month}
            </span>
          </Text>
          <div className="mt-3 grid max-h-[450px] grid-cols-1 gap-2 overflow-y-scroll">
            {availability?.possibleTimes.map((time) => {
              const isTimesReserved =
                !availability.availableTimes.includes(time)

              return (
                <button
                  key={time}
                  disabled={isTimesReserved}
                  onClick={() => handleSelectTime(time)}
                  className="h-fit cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500"
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
