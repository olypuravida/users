import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { createUser } from '@/domain/actions/users'
import { getRoleTeacher } from '@/domain/actions/roles'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { hashPassword } from '@/domain/utils/crypto'
import { teacherValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse

  try {
    const params = await req.json()
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['data'],
      validator: teacherValidator,
    })

    const { data } = params
    const { info, password, ...userData } = data ?? {}

    const teacherRole = await getRoleTeacher()
    const user = await createUser({
      ...userData,
      password: hashPassword(password),
      roleIds: {
        set: [ teacherRole?.id ],
      },
      info: {
        create: info,
      },
    })

    if (!user) { throw new NotFoundException() }

    return responseApiSuccess(res, {
      content: {
        message: 'Teacher created successfully!',
        user,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
