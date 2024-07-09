'use server'

import type { Prisma } from '@prisma/client'
import { usePrisma } from '../prisma/hooks'

export const getSession = async () => {
  const { session } = usePrisma()
  const result = await session.findMany()
  return result
}

export const createSession = async (data: Prisma.SessionCreateInput) => {
  const { session } = usePrisma()
  const result = await session.create({ data })
  return result
}

export const updateSession = async (where: Prisma.SessionWhereUniqueInput, data: Prisma.SessionUpdateInput) => {
  const { session } = usePrisma()
  const result = await session.update({ where, data })
  return result
}

export const deleteSession = async (where: Prisma.SessionWhereUniqueInput) => {
  const { session } = usePrisma()
  const result = await session.delete({ where })
  return result
}
