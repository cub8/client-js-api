import type { Prisma } from "@prisma/client"
import prisma from "@src/prisma"
import { listClientsSchema, type ListClientsInput } from "@src/validations/list_clients.schema"
import { z } from "zod"

type ListClientClients = Prisma.ClientGetPayload<{
  include: { integrations: true }
}>
type ListClientErrors = {
  firstNameEq?: string[]
  lastNameEq?: string[]
  peselEq?: string[]
  statusEq?: string[]
  firstNameIn?: string[]
  lastNameIn?: string[]
  peselIn?: string[]
  statusIn?: string[]
}

type ListClientsResult = {
  clients?: ListClientClients[]
  error?: ListClientErrors
}

type WhereQueryFilter = { equals?: string; in?: string[]; mode?: "insensitive" }

function buildListClientsQuery(params: ListClientsInput): Prisma.ClientWhereInput {
  const where: Record<string, unknown> = {}
  const enumFields = ["status"]

  const queryOperatorToPrismaOperator = (queryOperator: string) => {
    if (queryOperator === "Eq") {
      return "equals"
    } else if (queryOperator === "In") {
      return "in"
    }

    throw Error("Invalid query operator.")
  }

  for (const [key, value] of Object.entries(params)) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue

    const match = key.match(/^(.*)(Eq|In)$/)
    if (!match) continue

    const [, field, operator] = match as [string, string, string]
    const prismaOperator = queryOperatorToPrismaOperator(operator)
    const isEnum = enumFields.includes(field)
    const normalizeValue = (val: string | string[]) => {
      if (!isEnum) return val
      if (!Array.isArray(val)) return val.toUpperCase()

      return val.map((v) => v.toUpperCase())
    }

    const filter: WhereQueryFilter = {
      [prismaOperator]: normalizeValue(value),
    }

    if (!isEnum && operator === "Eq") filter.mode = "insensitive"

    where[field] = filter
  }

  return where
}

export default async function listClients(queryParams: unknown): Promise<ListClientsResult> {
  const result = listClientsSchema.safeParse(queryParams)

  if (!result.success) {
    const error = z.flattenError(result.error).fieldErrors
    return { error }
  }

  const whereQuery = buildListClientsQuery(result.data)
  const clients    = await prisma.client.findMany({
    where: whereQuery,
    include: { integrations: true },
  })

  return { clients }
}
