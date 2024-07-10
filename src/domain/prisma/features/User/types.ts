import type { User as UserModel } from '@prisma/client'
import type { Role } from '../Role/types'
import type { Session } from '../Session/types'
import type { UserInfo } from '../UserInfo/types'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// Interface for User model
export interface UserProps extends UserModel {
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
}
