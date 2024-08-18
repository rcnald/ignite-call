'use client'

import '@/lib/dayjs'

import { Text } from '@ignite-ui-rcnald/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { api } from '@/lib/axios'
import { getWeekDays } from '@/lib/utils'

interface CalendarWeek {
  week: number
  days: Array<{ date: dayjs.Dayjs; disabled: boolean }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({ onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const { username } = useParams<{ username: string }>()

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const shortWeekDays = getWeekDays({ short: true })

  const { data: blockedDates } = useQuery({
    queryKey: ['blockedDates', currentDate],
    queryFn: async () => {
      const response = await api.get<BlockedDates>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            year: currentDate.get('year'),
            month: `0${currentDate.get('month') + 1}`,
          },
        },
      )

      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return []

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()
    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekDays.includes(date.get('day')) ||
            blockedDates?.blockedDates.includes(date.get('date')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({ week: i / 7 + 1, days: original.slice(i, i + 7) })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <Text className="font-medium capitalize">
          {currentMonth} <span className="text-gray200">{currentYear}</span>
        </Text>
        <div className="flex gap-2 text-gray200">
          <button
            className="rounded-sm leading-[0] hover:text-gray100 focus:shadow [&_svg]:size-5"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft />
          </button>
          <button
            className="rounded-sm leading-[0] hover:text-gray100 focus:shadow [&_svg]:size-5"
            onClick={handleNextMonth}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <table className="w-full table-fixed border-spacing-1 font-default font-medium">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th className="text-sm font-medium text-gray200" key={weekDay}>
                {weekDay}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:leading-[0.75rem] before:text-gray-800 before:content-['.']">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week} className="[&_td]:box-border">
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <button
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                        className="aspect-square w-full cursor-pointer rounded-sm bg-gray600 disabled:cursor-default disabled:bg-transparent disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500"
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
