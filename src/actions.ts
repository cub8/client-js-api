import { type Client, type Integration, type ClientWithIntegrations, type ListCLientQueryParams, type ClientParams, type Status, type ListIntegrationsQueryParams } from "./interfaces.ts"
import prisma from "./prisma.ts"

export async function listClients(queryParams: ListCLientQueryParams): Promise<ClientWithIntegrations[]> {
    const clients = await prisma.client.findMany({
        where: { },
        include: { integrations: true }
    })

    return clients 
}

export async function createClient(params: ClientParams): Promise<Client> {
    const data = {
        first_name: params.first_name,
        last_name: params.last_name,
        pesel: params.pesel,
        status: "REGISTERED" as Status
    } 

    const client = await prisma.client.create({ data })
    return client
}

export async function updateClient(clientId: string | undefined, params: ClientParams): Client {
    // define updateClient
}

export async function updateClientStatus(clientId: string | undefined, status: Status): Client {
    // define updateStatus
}

export async function destroyClient(clientId: string | undefined): boolean {
    // define destroy Client
}

export async function listIntegrations(queryParams: ListIntegrationsQueryParams): Array<Integration> {
    // define listIntegrations
}
