import type { Prisma } from '@prisma/client'
import { usePrisma } from '../hooks'
import { RoleStatus } from '../features/Role'

export const roleSeed = async () => {
  const { role } = usePrisma()
  const roles = await role.findMany()
  if (roles.length > 0) return
  console.log('Seeding roles...')

  const data: Prisma.RoleCreateManyInput[] = [
    {
      name: 'ADMIN',
      status: RoleStatus.ACTIVE,
    },
    {
      name: 'COUNSELLOR',
      status: RoleStatus.ACTIVE,
    },
    {
      name: 'TEACHER',
      status: RoleStatus.ACTIVE,
    },
    {
      name: 'STUDENT',
      status: RoleStatus.ACTIVE,
    },
  ]

  await role.createMany({ data })
  console.log('Seeding roles done!')
}
