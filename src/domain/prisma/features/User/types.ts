import type { User as UserModel } from '@prisma/client'

// Interface for User model
export interface User extends UserModel {
  id: string
  username: string
  email: string
  password: string
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  info?: UserInfo
  infoId: string | null
  roles: Role[]
  roleIds: string[]
  sessions: Session[]
}
