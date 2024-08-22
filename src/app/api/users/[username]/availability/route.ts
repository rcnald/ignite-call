import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

dayjs.extend(utc)

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(request.url)
  const { username } = params

  const date = searchParams.get('date')
  const timezoneOffset = searchParams.get('timezoneOffset')

  if (!date || !timezoneOffset) {
    return NextResponse.json(
      { message: 'Date or timezoneOffset not provided.' },
      { status: 400 },
    )
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

  const timezoneOffsetInHours =
    typeof timezoneOffset === 'string'
      ? Number(timezoneOffset) / 60
      : Number(timezoneOffset[0]) / 60

  const referenceDateTimeZoneOffsetInHours =
    referenceDate.toDate().getTimezoneOffset() / 60

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
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set('hour', startHour)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
        lte: referenceDate
          .set('hour', endHour)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) =>
        blockedTime.date.getUTCHours() - timezoneOffsetInHours === time,
    )

    const isTimeInPast = referenceDate
      .set('hour', time)
      .subtract(referenceDateTimeZoneOffsetInHours, 'hours')
      .isBefore(dayjs().utc().subtract(timezoneOffsetInHours, 'hours'))

    return !isTimeBlocked && !isTimeInPast
  })

  return NextResponse.json({ possibleTimes, availableTimes })
}
