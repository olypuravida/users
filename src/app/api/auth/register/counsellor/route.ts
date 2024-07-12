import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { createUser } from '@/domain/actions/users'
import { getRoleCounsellor } from '@/domain/actions/roles'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { hashPassword } from '@/domain/utils/crypto'
import { counsellorValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse

  try {
    const params = await req.json()
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['data'],
      validator: counsellorValidator,
    })

    const { data } = params
    const { info, password, ...userData } = data ?? {}

    const counsellorRole = await getRoleCounsellor()
    const user = await createUser({
      ...userData,
      password: hashPassword(password),
      roleIds: {
        set: [ counsellorRole?.id ],
      },
      info: {
        create: info,
      },
    })

    if (!user) { throw new NotFoundException() }

    return responseApiSuccess(res, {
      content: {
        message: 'Counsellor created successfully!',
        user,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
