import type { Role, Session, UserInfo } from '@prisma/client'
import { DateTime } from 'luxon'

import { SECRET_KEY } from '@/domain/constants/app'
import { createSession, getSessions } from '@/domain/actions/session'
import { getRoles } from '@/domain/actions/roles'
import { getUserInfo } from '@/domain/actions/user-info'
import { updateUser } from '@/domain/actions/users'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils/crypto'

import type { UserProps, UserStatus } from './types'
import { SessionStatus } from '../Session/types'

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
  info?: UserInfo
  roles: Role[]
  roleIds: string[]
  sessions: Session[]

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
    this.roles = user.roles
    this.roleIds = user.roleIds
    this.sessions = user.sessions
  }

  async getRoles() {
    if (!this.roleIds || this.roleIds.length === 0) {
      this.roles = []
    }

    if (!this.roles && this.roleIds) {
      this.roles = await getRoles({ id: { in: this.roleIds } })
    }

    return this.roles
  }

  async getInfo() {
    if (!this.info) {
      this.info = await getUserInfo({ userId: this.id })
    }
    return this.info
  }

  async getSessions() {
    if (!this.sessions || this.sessions.length === 0) {
      this.sessions = await getSessions({ userId: this.id })
    }
    return this.sessions
  }

  hasSamePassword(password: string) {
    return this.password === hashPassword(password)
  }

  async getAccessToken() {
    await this.getSessions()
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
    console.log('getAccessToken', { accessToken, expiredAt })

    if (!accessToken) {
      const expire = DateTime.now().plus({ 'days': 7 })
      const token = await signJWT({
        expiredAt: expire.toMillis(),
        data: {
          id: this.id,
          username: this.username,
          email: this.email,
          roles: this.roles?.map(({ name }) => name),
        },
      }, SECRET_KEY)

      await createSession({
        accessToken: token,
        user: {
          connect: { id: this.id },
        },
      })

      return { accessToken: token, expiredAt: expire.toMillis() }
    }

    return { accessToken, expiredAt }
  }

  async json() {
    await this.getRoles()
    await this.getInfo()
    const { accessToken } = await this.getAccessToken() ?? {}
    const roles = this.roles.map(({ name }: any) => name)

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
