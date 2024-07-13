import type { Session as SessionModel } from '@prisma/client'
import type { User } from '../User/model'

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  EXPIRED = 'EXPIRED',
}

// Interface for Session model
export interface SessionProps extends SessionModel {
  id: string
  accessToken: string
  status: SessionStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user: User
  userId: string
}
