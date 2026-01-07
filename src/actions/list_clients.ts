import type { Prisma } from "@prisma/client"
import prisma from "@src/prisma"
import { listClientsSchema  } from "@src/validations/list_clients.schema"
import buildListClientsQuery from "@src/utils/build_list_clients_query"
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
