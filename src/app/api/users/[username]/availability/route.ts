import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(request.url)
  const { username } = params

  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ message: 'Date not provided' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return NextResponse.json(
      { message: 'User does not exists' },
      { status: 400 },
    )
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return NextResponse.json({ availability: [], possibleTimes: [] })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return NextResponse.json({ availability: [], possibleTimes: [] })
  }

  const { time_start_in_minutes: start, time_end_in_minutes: end } =
    userAvailability

  const startHour = start / 60
  const endHour = end / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      userId: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeInPast && !isTimeBlocked
  })

  return NextResponse.json({ possibleTimes, availableTimes })
}
