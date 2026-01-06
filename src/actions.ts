import { type Client, type Integration, type ClientWithIntegrations, type ListCLientQueryParams, type ClientParams, type Status, type ListIntegrationsQueryParams } from "@src/interfaces"
import prisma from "@src/prisma"
import { buildListClientsQuery } from "@src/queryBuilders"
import { validateListClientsParams, type RawClientListQuery } from "@src/validations"

type ListClientsResult = { error?: string; clients?: Client[] }

export async function listClients(queryParams: RawClientListQuery): Promise<ListClientsResult> {
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
