import { type ClientListOutParams } from "@src/validations"

type PrismaWhereQuery = Partial<Record<string, Record<string, string | string[]>>>

export function buildListClientsQuery(params: ClientListOutParams) {
  const query: PrismaWhereQuery = {}

  console.log(params)

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue

    const queryKey = key.substring(0, key.length - 2)
    query[queryKey] ||= {}

    if (key.endsWith("Eq")) {
      query[queryKey]["equals"] = value as string
    } else if (key.endsWith("In")) {
      query[queryKey]["in"] = value as string[]
    }
  }

  return query
}
