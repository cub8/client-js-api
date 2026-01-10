import prisma from "@src/prisma"

type DestroyClientError = {
  message: "Provided invalid ID"
  code: 400
}

type DestroyClientReturnType = {
  isDestroyed: boolean
  error?: DestroyClientError
}

export default async function destroyClient(clientId: number): Promise<DestroyClientReturnType> {
  await prisma.client.delete({
    where: {
      id: clientId,
    },
  })

  return { isDestroyed: true }
}
