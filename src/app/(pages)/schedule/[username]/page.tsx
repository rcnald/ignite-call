import { ScheduleForm } from '@/components/schedule/schedule-form'
import Avatar from '@/components/ui/avatar'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { prisma } from '@/lib/prisma'

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const { username } = params

  const user = await prisma.user.findUnique({
    where: { username },
  })

  return (
    <div className="mx-auto mb-4 max-w-[852px] px-4">
      <div className="flex flex-col items-center">
        <Avatar src={user?.avatar_url ?? ''} alt="" />
        <Heading className="mt-2 leading-base">{user?.name}</Heading>
        <Text className="text-gray200">{user?.bio}</Text>
      </div>
      <ScheduleForm />
    </div>
  )
}
