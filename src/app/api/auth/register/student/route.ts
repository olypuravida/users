import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { createUser } from '@/domain/actions/users'
import { getRoleStudent } from '@/domain/actions/roles'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { sendVerifyEmail } from '@/domain/providers/email/send'
import { hashPassword } from '@/domain/utils/crypto'
import { studentValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse

  try {
    const params = await req.json()
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['data'],
      validator: studentValidator,
    })

    const { data } = params
    const { info, password, ...userData } = data ?? {}

    const studentRole = await getRoleStudent()
    const user = await createUser({
      ...userData,
      password: hashPassword(password),
      roleIds: {
        set: [ studentRole?.id ],
      },
      info: {
        create: info,
      },
    })

    if (!user) { throw new NotFoundException() }
    await user.sign()

    await sendVerifyEmail({
      email: user.email,
      username: user.username,
      token: (await user.getAccessToken())?.accessToken,
    })

    return responseApiSuccess(res, {
      content: {
        message: 'Student created successfully!',
        user,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
