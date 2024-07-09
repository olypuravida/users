import type { Session as SessionModel } from '@prisma/client'
import type { User } from '../User/model'

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// Interface for Session model
export interface Session extends SessionModel {
  id: string
  accessToken: string
  status: SessionStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user: User
  userId: string
}
