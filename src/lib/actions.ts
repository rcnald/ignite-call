'use server'

import { signIn } from './auth'

export async function signInGoogle() {
  'use server'

  await signIn('google')
}
