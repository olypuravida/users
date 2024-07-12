import { NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import '@/domain/polyfills'

import { getUserByUsername } from '@/domain/actions/users'
import {
  NotFoundException,
  UnauthorizedException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { loginValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse
  const authBasic = req.headers.get('authorization')?.replace('Basic ', '') as string
  const [username, password] = Buffer.from(authBasic, 'base64').toString('utf-8').split(':')
  const params = { username, password }

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['username', 'password'],
      validator: loginValidator,
    })

    const user = await getUserByUsername(username)
    if (!user) { throw new NotFoundException() }

    const { accessToken, expiredAt } = await user.sign()
    const isExpired = Number(expiredAt) < DateTime.now().toMillis()
    if (!accessToken || isExpired) { throw new UnauthorizedException() }

    // setCookie('session', accessToken, { cookies })

    return responseApiSuccess(res, {
      content: {
        message: 'Login successfully!',
        user: await user.json(),
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
