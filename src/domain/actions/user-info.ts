import type { Prisma, UserInfo } from '@prisma/client'
import { usePrisma } from '../prisma/hooks'

export const getUserInfo = async (where: Prisma.UserInfoWhereUniqueInput) => {
  const { userInfo } = usePrisma()
  const result = await userInfo.findUnique({ where })
  return result as UserInfo
}
