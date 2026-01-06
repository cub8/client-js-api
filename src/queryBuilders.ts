import { type ClientListOutParams } from "@src/validations"

type PrismaWhereQuery = Partial<Record<string, Record<string, string | string[]>>>

export function buildListClientsQuery(params: ClientListOutParams) {
  const query: PrismaWhereQuery = {}

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue

    const isStatus = key.startsWith("status")
    const queryKey = key.substring(0, key.length - 2)
    query[queryKey] ||= {}

    if (key.endsWith("Eq")) {
      const stringValue = value as string
      const normalizedValue = isStatus ? stringValue.toUpperCase() : stringValue

      query[queryKey]["equals"] = normalizedValue
    } else if (key.endsWith("In")) {
      const arrayValue = value as string[]
      const normalizedValue = isStatus ? arrayValue.map((val) => val.toUpperCase()) : arrayValue

      query[queryKey]["in"] = normalizedValue
    }
  }

  return query
}
