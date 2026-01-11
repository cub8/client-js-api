import type { Client } from "@prisma/client"
import prisma from "@src/prisma"
import { createClientSchema } from "@src/schemas/create_client.schema"
import { z } from "zod"
import { ValidationError } from "@src/utils/errors"

interface CreateClientParams {
  firstName: string
  lastName: string
  pesel: string
  note?: string
}

export default async function createClient(params: CreateClientParams): Promise<Client> {
  const dataToValidate = {
    firstName: params.firstName || "",
    lastName: params.lastName || "",
    pesel: params.pesel,
    note: params.note,
  }

  const result = createClientSchema.safeParse(dataToValidate)

  if (!result.success) {
    throw new ValidationError(z.flattenError(result.error!).fieldErrors)
  }

  const client = await prisma.client.create({
    data: {
      ...result.data,
      note: result.data.note || null,
      status: "REGISTERED",
    },
  })

  return client
}
