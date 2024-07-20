import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import {
  UnauthorizedException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { isTokenExpired } from '@/domain/utils/crypto'
import { SECRET_KEY } from '@/domain/constants/app'
import { getUserByAccessToken, updateUser } from '@/domain/actions/users'

export async function POST(req: Request) {
  const res = NextResponse

  try {
    await apiMiddleware(req, {}, res, {
      authorization: true,
      only: ['POST'],
    })

    const accessToken = `${req.headers.get('authorization')?.replace('Bearer ', '')}`
    if (!accessToken) {
      const err = new UnauthorizedException()
      err.setMessage('Token not found')
      throw err
    }

    const isExpired = await isTokenExpired(accessToken, SECRET_KEY)
    if (isExpired) {
      const err = new UnauthorizedException()
      err.setMessage('Token expired. Please provide a new token')
      throw err
    }

    let user = await getUserByAccessToken(accessToken)
    if (!user) {
      const err = new UnauthorizedException()
      err.setMessage('User not found')
      throw err
    }

    user = await updateUser({ id: user.id }, { emailVerified: true })

    return responseApiSuccess(res, {
      content: {
        message: 'Email verified successfully!',
        user: await user?.json(),
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
