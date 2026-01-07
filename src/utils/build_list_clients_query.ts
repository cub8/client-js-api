import type { Prisma } from "@prisma/browser"
import type { ListClientsInput } from "@src/validations/list_clients.schema"

type WhereQueryFilter = { equals?: string; in?: string[]; mode?: "insensitive" }

const ENUM_FIELDS = ["status"] as const

function normalizeValue(field: string, value: string | string[]) {
  if (!(ENUM_FIELDS as readonly string[]).includes(field)) return value

  if (Array.isArray(value)) return value.map((v) => v.toUpperCase())

  return value.toUpperCase()
}

function queryOperatorToPrismaOperator(operator: string) {
  if (operator === "Eq") {
    return "equals"
  } else if (operator === "In") {
    return "in"
  }

  throw Error("Invalid query operator.")
}

export default function buildListClientsQuery(params: ListClientsInput): Prisma.ClientWhereInput {
  const where: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue

    const match = key.match(/^(.*)(Eq|In)$/)
    if (!match) continue


    const [, field, operator] = match as [string, string, string]
    const prismaOperator = queryOperatorToPrismaOperator(operator)
    const isEnum = (ENUM_FIELDS as readonly string[]).includes(field)

    const filter: WhereQueryFilter = {
      [prismaOperator]: normalizeValue(field, value),
    }

    if (!isEnum && operator === "Eq") filter.mode = "insensitive"

    where[field] = filter
  }

  return where
}
