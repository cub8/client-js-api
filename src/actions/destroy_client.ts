import { Prisma } from "@/generated/prisma/client"
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

  try {
    await prisma.client.delete({
      where: {
        id: parsedClientId,
      },
    })
  } catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return {
          isDestroyed: false,
          error: { message: "User not found", code: 404 },
        }
      }
    }

    throw e
  }

  return { isDestroyed: true }
}
