import type { SessionProps, SessionStatus } from './types'
import type { User } from '../User'

export class Session implements SessionProps {
  id: string
  accessToken: string
  status: SessionStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user: User
  userId: string

  constructor(session: SessionProps) {
    this.id = session.id
    this.accessToken = session.accessToken
    this.status = session.status
    this.createdAt = session.createdAt
    this.updatedAt = session.updatedAt
    this.deletedAt = session.deletedAt
    this.user = session.user
    this.userId = session.userId
  }
}
