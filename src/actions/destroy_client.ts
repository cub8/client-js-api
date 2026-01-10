import prisma from "@src/prisma"

type DestroyClientError = {
  message: "Provided invalid ID"
  code: 400
} | {
  message: "User not found"
  code: 404
}

type DestroyClientReturnType = {
  isDestroyed: boolean
  error?: DestroyClientError
}

export default async function destroyClient(clientId: string): Promise<DestroyClientReturnType> {
  const parsedClientId = Number(clientId)
  if (isNaN(parsedClientId)) {
    return {
      isDestroyed: false,
      error: { message: "Provided invalid ID", code: 400 },
    }
  }

  const client = await prisma.client.findFirst({
    where: {
      id: parsedClientId,
    },
  })

  if (!client) {
    return {
      isDestroyed: false,
      error: { message: "User not found", code: 404 },
    }
  }

  await prisma.client.delete({
    where: {
      id: parsedClientId,
    },
  })

  return { isDestroyed: true }
}
