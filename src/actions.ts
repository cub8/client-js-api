import { type Client, type Integration, type ClientWithIntegrations, type ListCLientQueryParams, type ClientParams, type Status, type ListIntegrationsQueryParams } from "./interfaces.ts"
import prisma from "./prisma.ts"
import { buildListClientsQuery } from "./queryBuilders.ts"
import { validateListClientsParams, type RawClientListQuery } from "./validations.ts"

type ListClientsResult = { error?: string; clients?: Client[] }

export async function listClients(queryParams: RawClientListQuery) {
  const { valid, message, params } = validateListClientsParams(queryParams)
  if (valid === false) {
    return { error: `Provided invalid queryParams. ${message}` }
  }

  const whereQuery = buildListClientsQuery(params)
  const clients = await prisma.client.findMany({
    where: whereQuery,
    include: { integrations: true },
  })

  return { clients }
}

export async function createClient(params: ClientParams) {
  const data = {
    firstName: params.firstName,
    lastName: params.lastName,
    pesel: params.pesel,
    status: "REGISTERED" as Status,
  }

  const client = await prisma.client.create({ data })
  return client
}

export async function updateClient(clientId: string | undefined, params: ClientParams) {
  // define updateClient
}

export async function updateClientStatus(clientId: string | undefined, status: Status) {
  // define updateStatus
}

export async function destroyClient(clientId: string | undefined) {
  // define destroy Client
}

export async function listIntegrations(queryParams: ListIntegrationsQueryParams) {
  // define listIntegrations
}
