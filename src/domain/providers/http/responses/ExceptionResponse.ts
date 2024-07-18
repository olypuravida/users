import type { NextResponse } from 'next/server'
import { MethodNotAllowedException } from '../exceptions/MethodNotAllowed'
import { InternalServerErrorException } from '../exceptions/InternalServerError'
import { NotFoundException } from '../exceptions/NotFound'
import { UnauthorizedException } from '../exceptions/Unauthorized'
import { BadRequestException } from '../exceptions/BadRequest'

type Response = typeof NextResponse

type AnyException = NotFoundException
  | UnauthorizedException
  | MethodNotAllowedException
  | InternalServerErrorException
  | BadRequestException
  | any

export const responseApiException = (res: Response, exception: AnyException) => {
  const exceptions = [
    NotFoundException.name,
    UnauthorizedException.name,
    MethodNotAllowedException.name,
    InternalServerErrorException.name,
    BadRequestException.name,
  ]
  let err: AnyException = exception

  if (!exceptions.includes(err.constructor.name)) {
    err = new InternalServerErrorException()
  }

  if (typeof exception === 'string') {
    err.setMessage(exception)
  } else if (exception instanceof Error) {
    err.setMessage(exception.message)
  }

  const { code } = err.status
  const { headers, ...response } = err.getResponse()

  if (headers) {
    headers.forEach((value: string, key: string) => {
      res.next().headers.set(key, value)
    })
  }

  return res.json({ ...response }, { status: code })
}
