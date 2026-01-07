import { type Client, type Integration, type ClientWithIntegrations, type ListCLientQueryParams, type ClientParams, type Status, type ListIntegrationsQueryParams } from "@src/interfaces"
import prisma from "@src/prisma"


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
