import type { Client, Status, IntegrationType } from "@prisma/client"
import prisma from "@src/prisma"
import { Factory } from "fishery"

type Integration = {
  type: IntegrationType
  id?: number
  createdAt?: Date
  clientId?: number
}

export interface ClientWithIntegrations extends Client {
  integrations: Integration[]
}

class ClientFactory extends Factory<ClientWithIntegrations> { }

const clientFactory = ClientFactory.define(({ sequence, params, onCreate }) => {
  onCreate((client) => {
    const { id: _id, integrations, ...clientData } = client

    return prisma.client.create({
      data: {
        ...clientData,
        integrations: {
          create: integrations?.map((integration) => ({ type: integration.type })) || [],
        },
      },
      include: {
        integrations: true,
      },
    })
  })

  return {
    id: sequence,
    firstName: "John",
    lastName: "Doe",
    pesel: "12345678901",
    status: "REGISTERED" as Status,
    note: null,
    integrations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...params,
  }
})

export default clientFactory
