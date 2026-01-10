import type { Client } from "@prisma/client"
import prisma from "@src/prisma"
import { updateClientSchema } from "@src/validations/update_client.schema"
import z from "zod"

interface UpdateClientParams {
  firstName?: string
  lastName?: string
  pesel?: string
}

type UpdateClientError = {
  pesel?: string[]
  firstName?: string[]
  lastName?: string[]
  clientId?: string[]
}

type UpdateClientReturnType = {
  client?: Client
  error?: {
    code: number
    errors: UpdateClientError
  }
}

export default async function updateClient(clientId: number, params: UpdateClientParams): Promise<UpdateClientReturnType> {
  const dataToValidate = {
    firstName: params.firstName,
    lastName: params.lastName,
    pesel: params.pesel,
  }

  const result = updateClientSchema.safeParse(dataToValidate)

  if (!result.success) {
    return {
      error: {
        errors: z.flattenError(result.error!).fieldErrors,
        code: 422,
      },
    }
  }

  const updatedClient = await prisma.client.update({
    where: { id: clientId },
    data: result.data,
  })

  return { client: updatedClient }
}
