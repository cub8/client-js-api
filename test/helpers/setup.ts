import { beforeEach, afterAll } from "vitest"
import prisma from "@/src/prisma"

beforeEach(async() => {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Integration",
      "Client"
    RESTART IDENTITY CASCADE;
  `)
})

afterAll(async() => {
  await prisma.$disconnect()
})
