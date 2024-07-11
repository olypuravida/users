import type { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { usePrisma } from '../hooks'
import { UserStatus } from '../features/User/types'
import { hashPassword } from '../../utils/crypto'

export const userSeed = async () => {
  const { user, role } = usePrisma()
  const usersExists = await user.findMany()
  if (usersExists.length > 0) return
  console.log('Seeding users...')

  const rolesData = await role.findMany()
  const adminRole = rolesData.find(role => role.name === 'ADMIN')
  const counsellorRole = rolesData.find(role => role.name === 'COUNSELLOR')
  const teacherRole = rolesData.find(role => role.name === 'TEACHER')
  const studentRole = rolesData.find(role => role.name === 'STUDENT')

  const adminsUsers = new Array<Prisma.UserCreateInput>(3).fill(null as any).map(() => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashPassword('admin1234'),
    status: UserStatus.ACTIVE,
    emailVerified: true,
    roleIds: {
      set: [ adminRole?.id ],
    },
    info: {
      create: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.birthdate(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar(),
        gender: faker.person.sex().toUpperCase(),
        school: faker.company.name(),
        class: faker.helpers.arrayElement(['1', '2', '3', '4', '5', '6']),
        docType: faker.helpers.arrayElement(['ID', 'PASPORT', 'DRIVER_LICENSE']),
        docID: faker.helpers.arrayElement(['123456789', '987654321']),
      },
    },
  }))

  for (const u of adminsUsers) {
    await user.create({ data: u as Prisma.UserCreateInput })
  }

  const userData = new Array<Prisma.UserCreateInput>(10).fill(null as any).map(() => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashPassword('demo1234'),
    status: UserStatus.ACTIVE,
    emailVerified: true,
    roleIds: {
      set: [
        faker.helpers.arrayElement([
          counsellorRole?.id,
          teacherRole?.id,
          studentRole?.id,
        ]),
      ],
    },
    info: {
      create: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.birthdate(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar(),
        gender: faker.person.sex().toUpperCase(),
        school: faker.company.name(),
        class: faker.helpers.arrayElement(['1', '2', '3', '4', '5', '6']),
        docType: faker.helpers.arrayElement(['ID', 'PASPORT', 'DRIVER_LICENSE', 'STUDENT_CARD']),
        docID: faker.helpers.arrayElement(['123456789', '987654321']),
      },
    },
  }))

  for (const u of userData) {
    await user.create({ data: u as Prisma.UserCreateInput })
  }

  console.log('Seeding users done!')
}
