import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

export const usePrisma = () => {
  if (prisma) return prisma
  prisma = new PrismaClient()
  return prisma
}
