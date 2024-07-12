import { getUserByAccessToken } from '@/domain/actions/users'
import { getSession } from '@/domain/actions/session'
import { SessionStatus } from '@/domain/prisma/features/Session/types'
import { isTokenExpired } from '@/domain/utils/crypto'
import { UnauthorizedException } from '../../../exceptions/Unauthorized'
import { SECRET_KEY } from '@/domain/constants/app'

const BEARER = 'Bearer'
const MASTER_TOKEN = `${process.env.MASTER_TOKEN}`

export const validateAccessAuthorization = async (req: Request) => {
  const bearerToken = req.headers.get('authorization')
  const isBearer = !!bearerToken?.includes(BEARER)
  const accessToken = bearerToken?.replace(BEARER, '').trim()
  const err = new UnauthorizedException()

  if (!bearerToken) {
    err.setMessage('Authorization header is required')
    throw err
  }
  if (!isBearer) {
    err.setMessage('Authorization header required a Bearer token')
    throw err
  }
  if (!accessToken) {
    err.setMessage('Authorization header required a token')
    throw err
  }

  if (MASTER_TOKEN && accessToken === MASTER_TOKEN) {
    return true
  }

  const user = await getUserByAccessToken(accessToken)
  if (!user) {
    err.setMessage('Invalid access token')
    throw err
  }

  const session = await getSession({ accessToken })
  const isExpired = await isTokenExpired(accessToken, SECRET_KEY)
  if (isExpired || session?.status === SessionStatus.EXPIRED) {
    err.setMessage('Access token is expired')
    throw err
  }
}
