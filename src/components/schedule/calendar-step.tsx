'use client'

import { Box, Text } from '@ignite-ui-rcnald/react'

import { cn } from '@/lib/utils'

import { Calendar } from '../ui/calendar'

export function CalendarStep() {
  const isDateSelected = true as boolean

  return (
    <Box
      className={cn('relative mx-auto mt-6 grid max-w-full p-0', {
        'grid-cols-[1fr_280px] max-lg:grid-cols-1': isDateSelected === true,
        'w-[540px] grid-cols-1': isDateSelected === false,
      })}
    >
      <Calendar />
      <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-gray600 p-6 pb-0">
        <Text className="font-medium">
          terça-feira <span className="text-gray200">20 de setembro</span>
        </Text>
        <div className="mt-3 grid grid-cols-1 gap-2 max-lg:grid-cols-2">
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
          <button className="cursor-pointer rounded-sm bg-gray600 py-2 text-sm leading-base text-gray100 last:mb-6 disabled:cursor-default disabled:bg-none disabled:opacity-40 [&:not(:disabled)]:hover:bg-gray500">
            08:00h
          </button>
        </div>
      </div>
    </Box>
  )
}
