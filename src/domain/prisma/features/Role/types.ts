import type { Role as RoleModel } from '@prisma/client'
import type { User } from '../User/model'

// Interface for Role model
export interface Role extends RoleModel {
  id: string
  name: string
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  users: User[]
  userIds: string[]
}
