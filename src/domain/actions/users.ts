'use server'

import { usePrisma } from '../prisma/hooks'
import type { Prisma } from '@prisma/client'

export const getUsers = async () => {
  const { user } = usePrisma()
  const users = await user.findMany()
  return users
}

export const getUser = async (where: Prisma.UserWhereUniqueInput) => {
  const { user } = usePrisma()
  const result = await user.findUnique({ where })
  return result
}

export const getUserByUsername = async (username: string) => {
  const { user } = usePrisma()
  let result = await user.findUnique({ where: { username } })
  if (!result) {
    result = await user.findUnique({ where: { email: username } })
  }
  return result
}

export const getUserByAccessToken = async (accessToken: string) => {
  const { session } = usePrisma()
  const sessionResult = await session.findUnique({
    where: { accessToken },
    include: { user: true },
  })
  return sessionResult?.user
}

export const createUser = async (data: Prisma.UserCreateInput) => {
  const { user } = usePrisma()
  const result = await user.create({ data })
  return result
}

export const updateUser = async (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) => {
  const { user } = usePrisma()
  const result = await user.update({ where, data })
  return result
}

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  const { user } = usePrisma()
  const result = await user.delete({ where })
  return result
}
