import type { Client, Status } from "@prisma/client"
import prisma from "@src/prisma"
import { updateClientStatusSchema } from "@src/validations/update_client_status.schema"
import { z } from "zod"

type UpdateClientError = {
  clientId?: string[]
  status?: string[]
}

type UpdateClientReturnType = {
  client?: Client
  error?: {
    code: number
    errors: UpdateClientError
  }
}

export default async function updateClientStatus(clientId: number, status: Status): Promise<UpdateClientReturnType> {
  const parsedClientId = Number(clientId)
  const dataToValidate = { status }
  const result = updateClientStatusSchema.safeParse(dataToValidate)

  if (!result.success) {
    return {
      error: {
        errors: z.flattenError(result.error!).fieldErrors,
        code: 422,
      },
    }
  }

  const updatedClient = await prisma.client.update({
    where: { id: parsedClientId },
    data: result.data,
  })

  return { client: updatedClient }
}
