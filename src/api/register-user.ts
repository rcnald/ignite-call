import { cache } from 'react'

import { api } from '@/lib/axios'

export const registerUser = cache(
  async ({ name, username }: { name: string; username: string }) => {
    const registerUserResponse = await api.post('/users', {
      data: { name, username },
    })

    return registerUserResponse.data
  },
)
