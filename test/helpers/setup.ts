import { beforeEach, afterAll } from "vitest"
import prisma from "@/src/prisma"

beforeEach(async() => {
  const tablenames = await prisma.$queryRawUnsafe<Array<{ tablename: string }>>(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != '_prisma_migrations';
  `)

  const tables = tablenames
    .map(({ tablename }) => `"${tablename}"`)
    .join(", ")

  if (tables.length > 0) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`)
  }
})

afterAll(async() => {
  await prisma.$disconnect()
})
