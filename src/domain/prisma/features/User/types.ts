import type {
  Role,
  Session,
  UserInfo,
  User as UserModel,
} from '@prisma/client'

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
  roles: Role[]
  roleIds: string[]
  sessions: Session[]
}
