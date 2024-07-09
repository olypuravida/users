import { PrismaClient } from '@prisma/client'

export const usePrisma = () => {
  const prisma = new PrismaClient()
  return prisma
}
