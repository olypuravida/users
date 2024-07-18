'use server'

import type { Prisma, Role } from '@prisma/client'
import { usePrisma } from '../prisma/hooks'

export const getRoles = async (where: Prisma.RoleWhereInput) => {
  const { role } = usePrisma()
  const result = await role.findMany({ where })
  return result as Role[]
}

export const getRole = async (where: Prisma.RoleWhereUniqueInput) => {
  const { role } = usePrisma()
  const result = await role.findUnique({ where })
  return result
}

export const getRoleAdmin = async () => {
  const { role } = usePrisma()
  const result = await role.findUnique({ where: { name: 'ADMIN' } })
  return result
}

export const getRoleCounsellor = async () => {
  const { role } = usePrisma()
  const result = await role.findUnique({ where: { name: 'COUNSELLOR' } })
  return result
}

export const getRoleTeacher = async () => {
  const { role } = usePrisma()
  const result = await role.findUnique({ where: { name: 'TEACHER' } })
  return result
}

export const getRoleStudent = async () => {
  const { role } = usePrisma()
  const result = await role.findUnique({ where: { name: 'STUDENT' } })
  return result
}

export const createRole = async (data: Prisma.RoleCreateInput) => {
  const { role } = usePrisma()
  const result = await role.create({ data })
  return result
}

export const updateRole = async (where: Prisma.RoleWhereUniqueInput, data: Prisma.RoleUpdateInput) => {
  const { role } = usePrisma()
  const result = await role.update({ where, data })
  return result
}

export const deleteRole = async (where: Prisma.RoleWhereUniqueInput) => {
  const { role } = usePrisma()
  const result = await role.delete({ where })
  return result
}
