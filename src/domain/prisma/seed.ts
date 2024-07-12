import { roleSeed } from './seeds/roleSeed'
import { userSeed } from './seeds/usersSeed'

const main = async () => {
  console.log('Starting seeding...')

  await roleSeed()
  await userSeed()

  console.log('Seeding done!')
}

main()
