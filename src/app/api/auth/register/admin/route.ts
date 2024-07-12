import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { createUser } from '@/domain/actions/users'
import { getRoleAdmin } from '@/domain/actions/roles'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { hashPassword } from '@/domain/utils/crypto'
import { adminValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse

  try {
    const params = await req.json()
    await apiMiddleware(req, params, res, {
      authorization: true,
      only: ['POST'],
      permit: ['data'],
      validator: adminValidator,
    })

    const { data } = params
    const { info, password, ...userData } = data ?? {}

    const adminRole = await getRoleAdmin()
    const user = await createUser({
      ...userData,
      password: hashPassword(password),
      roleIds: {
        set: [ adminRole?.id ],
      },
      info: {
        create: info,
      },
    })

    if (!user) { throw new NotFoundException() }

    return responseApiSuccess(res, {
      content: {
        message: 'Admin created successfully!',
        user,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
