import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(request: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json(null, { status: 401 })
  }

  const { bio } = updateProfileBodySchema.parse(await request.json())

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: { bio },
  })

  return NextResponse.json(null, { status: 200 })
}
