import { DateTime } from 'luxon'

import type { UserProps, UserStatus } from './types'
import type { UserInfo } from '../UserInfo/types'
import type { Role } from '../Role/types'
import { SessionStatus, type Session } from '../Session/types'

import { SECRET_KEY } from '@/domain/constants/app'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils/crypto'
import { updateUser } from '@/domain/actions/users'
import { createSession } from '@/domain/actions/session'
import type { Prisma } from '@prisma/client'

export class User implements UserProps {
  id: string
  username: string
  email: string
  password: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  info?: UserInfo
  infoId: string | null
  roles: Role[]
  roleIds: string[]
  sessions: Session[]

  constructor(user: UserProps) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.password = user.password
    this.status = user.status
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.deletedAt = user.deletedAt
    this.info = user.info
    this.infoId = user.infoId
    this.roles = user.roles
    this.roleIds = user.roleIds
    this.sessions = user.sessions
  }

  hasSamePassword(password: string) {
    return this.password === hashPassword(password)
  }

  async getAccessToken() {
    const activeSessions = this.sessions.filter(({ status }) => status === SessionStatus.ACTIVE)
    if (!activeSessions || activeSessions.length === 0) { return null }
    let activeToken = null

    for (const session of activeSessions) {
      const { expiredAt } = await decodeJWT(session.accessToken, SECRET_KEY)

      if (Number(expiredAt) < DateTime.now().toMillis()) {
        session.status = SessionStatus.INACTIVE
        await updateUser({ id: session.userId }, session)
      } else {
        activeToken = {
          accessToken: session.accessToken,
          expiredAt,
        }
        break
      }
    }

    return activeToken
  }

  async sign() {
    const { accessToken, expiredAt } = await this.getAccessToken() || {}

    if (!accessToken) {
      const expire = DateTime.now().plus({ 'days': 7 })
      const token = await signJWT({
        expiredAt: expire.toMillis(),
        data: {
          id: this.id,
          username: this.username,
          email: this.email,
          roles: this.roles.map(({ name }) => name),
        },
      }, SECRET_KEY)

      await createSession({
        accessToken: token,
        user: this as Prisma.UserCreateNestedOneWithoutSessionsInput,
      })

      return { accessToken: token, expiredAt: expire.toMillis() }
    }

    return { accessToken, expiredAt }
  }

  async json() {
    const { accessToken } = await this.getAccessToken() ?? {}
    // if (!this.roles) { await this.getRoles() }
    const roles = this.roles?.map(({ name }: any) => name)
    // const info = await this.getInfo()

    return {
      id: this.id,
      username: this.username,
      email: this.email,
      accessToken,
      roles,
      info: this.info,
    }
  }
}
