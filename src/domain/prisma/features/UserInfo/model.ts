import type { UserInfoProps } from './types'
import type { User } from '../User'

export class UserInfo implements UserInfoProps {
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
  teacherId: string | null

  constructor(userInfo: UserInfoProps) {
    this.id = userInfo.id
    this.firstName = userInfo.firstName
    this.lastName = userInfo.lastName
    this.birthDate = userInfo.birthDate
    this.phone = userInfo.phone
    this.address = userInfo.address
    this.school = userInfo.school
    this.class = userInfo.class
    this.docType = userInfo.docType
    this.docID = userInfo.docID
    this.avatar = userInfo.avatar
    this.gender = userInfo.gender
    this.createdAt = userInfo.createdAt
    this.updatedAt = userInfo.updatedAt
    this.deletedAt = userInfo.deletedAt
    this.user = userInfo.user
    this.userId = userInfo.userId
    this.teacherId = userInfo.teacherId
  }
}
