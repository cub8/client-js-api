import type { Client } from "@/generated/prisma/browser"
import { type ClientParams, type Status } from "@src/interfaces"
import prisma from "@src/prisma"
import { createClientSchema } from "@/src/validations/create_client.schema"
import { z } from "zod"

type CreateClientReturnType = {
  client?: Client
  errors?: { pesel?: string[]
    firstName?: string[]
    lastName?: string[]
    status?: string[] }
}

export default async function createClient(params: ClientParams): Promise<CreateClientReturnType> {
  const dataToValidate = {
    firstName: params.firstName || "",
    lastName: params.lastName || "",
    pesel: params.pesel,
    status: "REGISTERED" as Status,
  }

  const result = createClientSchema.safeParse(dataToValidate)

  if (!result.success) {
    return {
      errors: z.flattenError(result.error!).fieldErrors,
    }
  }

  const client = await prisma.client.create({ data: result.data })

  return { client }
}
