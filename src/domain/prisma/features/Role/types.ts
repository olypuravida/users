import type { Role as RoleModel } from '@prisma/client'
import type { User } from '../User/model'

export enum RoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// Interface for Role model
export interface RoleProps extends RoleModel {
  id: string
  name: string
  status: RoleStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  users: User[]
  userIds: string[]
}
