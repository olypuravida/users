import type { Prisma } from '@prisma/client'
import { DateTime } from 'luxon'

import { SECRET_KEY } from '@/domain/constants/app'
import { createSession } from '@/domain/actions/session'
import { updateUser } from '@/domain/actions/users'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils/crypto'

import type { UserProps, UserStatus } from './types'
import type { UserInfoProps } from '../UserInfo/types'
import type { RoleProps } from '../Role/types'
import { SessionStatus, type SessionProps } from '../Session/types'

export class User implements UserProps {
  id: string
  username: string
  email: string
  password: string
  emailVerified: boolean
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  info?: UserInfoProps
  infoId: string | null
  roles: RoleProps[]
  roleIds: string[]
  sessions: SessionProps[]

  constructor(user: UserProps) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.password = user.password
    this.emailVerified = user.emailVerified
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
    this.sessions ??= []
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
