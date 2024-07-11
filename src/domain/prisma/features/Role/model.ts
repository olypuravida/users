import type { RoleProps, RoleStatus } from './types'
import type { User } from '../User'

export class Role implements RoleProps {
  id: string
  name: string
  status: RoleStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  users: User[]
  userIds: string[]

  constructor(role: RoleProps) {
    this.id = role.id
    this.name = role.name
    this.status = role.status
    this.createdAt = role.createdAt
    this.updatedAt = role.updatedAt
    this.deletedAt = role.deletedAt
    this.users = role.users
    this.userIds = role.userIds
  }
}
