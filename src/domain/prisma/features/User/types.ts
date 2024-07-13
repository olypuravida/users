import type { User as UserModel } from '@prisma/client'
import type { RoleProps } from '../Role/types'
import type { SessionProps } from '../Session/types'
import type { UserInfoProps } from '../UserInfo/types'

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

  info?: UserInfoProps
  infoId: string | null
  roles: RoleProps[]
  roleIds: string[]
  sessions: SessionProps[]
}
