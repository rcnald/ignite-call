import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'

const createSchedulingBody = z.object({
  name: z.string(),
  email: z.string(),
  observations: z.string(),
  date: z.string().datetime(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const { username } = params

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return NextResponse.json(
      { message: 'User does not exists' },
      { status: 400 },
    )
  }

  const { name, email, observations, date } = createSchedulingBody.parse(
    await request.json(),
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json(
      { message: 'Date is in the past' },
      { status: 400 },
    )
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      userId: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return NextResponse.json(
      { message: 'There is another schedule for this time' },
      { status: 400 },
    )
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      userId: user.id,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return NextResponse.json({}, { status: 201 })
}
