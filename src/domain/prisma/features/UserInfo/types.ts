import type { UserInfo as UserInfoModel } from '@prisma/client'
import type { User } from '../User/model'

// Interface for UserInfo model
export interface UserInfo extends UserInfoModel {
  id: string
  firstName: string
  lastName: string
  birthDate: Date
  phone: string
  address: string
  school: string | null
  class: string | null
  docType: string | null
  docID: string | null
  avatar: string | null
  gender: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user?: User
  userId: string
  teacherId?: string
}
