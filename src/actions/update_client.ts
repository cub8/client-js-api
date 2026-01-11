import type { Client } from "@prisma/client"
import prisma from "@src/prisma"
import { updateClientSchema } from "@src/schemas/update_client.schema"
import { z } from "zod"
import { ValidationError } from "@src/utils/errors"

interface UpdateClientParams {
  firstName?: string
  lastName?: string
  pesel?: string
  note?: string
}

export default async function updateClient(clientId: number, params: UpdateClientParams): Promise<Client> {
  const dataToValidate = {
    firstName: params.firstName,
    lastName: params.lastName,
    pesel: params.pesel,
    note: params.note,
  }

  const result = updateClientSchema.safeParse(dataToValidate)

  if (!result.success) {
    throw new ValidationError(z.flattenError(result.error!).fieldErrors)
  }

  const updatedClient = await prisma.client.update({
    where: { id: clientId },
    data: {
      ...result.data,
      updatedAt: new Date(),
    },
  })

  return updatedClient
}
