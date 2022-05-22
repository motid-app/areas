import { PrismaClient } from "@prisma/client"
import seedAreas from './fixtures/areas'

const prisma = new PrismaClient()

async function main() {
  await seedAreas(prisma)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })