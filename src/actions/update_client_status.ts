import type { Client, Status } from "@prisma/client"
import prisma from "@src/prisma"
import { updateClientStatusSchema } from "@src/validations/update_client_status.schema"
import { z } from "zod"
import { ValidationError } from "@src/utils/errors"

export default async function updateClientStatus(clientId: number, status: Status): Promise<Client> {
  const dataToValidate = { status }
  const result = updateClientStatusSchema.safeParse(dataToValidate)

  if (!result.success) {
    throw new ValidationError(z.flattenError(result.error!).fieldErrors)
  }

  const updatedClient = await prisma.client.update({
    where: { id: clientId },
    data: result.data,
  })

  return updatedClient
}
