'use server'

import type { Prisma } from '@prisma/client'
import { usePrisma } from '../prisma/hooks'
import { User } from '../prisma/features/User/model'
import type { UserProps } from '../prisma/features/User'

export const getUsers = async (where: Prisma.UserWhereInput) => {
  const { user } = usePrisma()
  const users = await user.findMany({ where })
  return users.map(user => new User(user as UserProps))
}

export const getUser = async (where: Prisma.UserWhereUniqueInput) => {
  const { user } = usePrisma()
  const result = await user.findUnique({ where })
  return new User(result as UserProps)
}

export const getUserByUsername = async (username: string) => {
  const { user } = usePrisma()
  let result = await user.findUnique({ where: { username } })
  if (!result) {
    result = await user.findUnique({ where: { email: username } })
  }

  if (!result) { return null }
  return new User(result as UserProps)
}

export const getUserByAccessToken = async (accessToken: string) => {
  const { session } = usePrisma()
  const sessionResult = await session.findUnique({
    where: { accessToken },
    include: { user: true },
  })
  return new User(sessionResult?.user as UserProps)
}

export const createUser = async (data: Prisma.UserCreateInput) => {
  const { user } = usePrisma()
  const result = await user.create({ data, include: { info: true } })
  return result
  // return new User(result as UserProps)
}

export const updateUser = async (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) => {
  const { user } = usePrisma()
  const result = await user.update({ where, data })
  return new User(result as UserProps)
}

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  const { user } = usePrisma()
  const result = await user.delete({ where })
  return result
}
