import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(request.url)
  const { username } = params

  const year = searchParams.get('year')
  const month = searchParams.get('month')

  if (!year || !month) {
    return NextResponse.json(
      { message: 'month or year not provided' },
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

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = Array.from({ length: 7 })
    .map((_, i) => i)
    .filter((weekDay) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

  const blockedDatesRaw = await prisma.$queryRaw<Array<{ date: string }>>`
      SELECT 
        EXTRACT(DAY FROM S.date) AS date,
        COUNT(S.date) AS amount,
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

      FROM schedulings AS S

      LEFT JOIN user_time_intervals AS UTI
        ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

      WHERE S.userId = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

      GROUP BY EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      HAVING amount >= size
    `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return NextResponse.json({ blockedWeekDays, blockedDates })
}
