import prisma from "@src/prisma"
import type { Prisma } from "@prisma/client"

type ShowClientResult = Prisma.ClientGetPayload<{
  include: { integrations: true }
}>

export default async function showClient(clientId: number): Promise<ShowClientResult> {
  const client = await prisma.client.findUniqueOrThrow({
    where: { id: clientId },
    include: { integrations: true },
  })

  return client
}
