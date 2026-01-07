import type { Client, Status } from "@prisma/client"
import prisma from "@src/prisma"
import { createClientSchema } from "@/src/validations/create_client.schema"
import { z } from "zod"

interface ClientParams {
  firstName: string
  lastName: string
  pesel: string
}

type CreateClientError = {
  pesel?: string[]
  firstName?: string[]
  lastName?: string[]
  status?: string[]
}

type CreateClientReturnType = {
  client?: Client
  error?: CreateClientError
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
      error: z.flattenError(result.error!).fieldErrors,
    }
  }

  const client = await prisma.client.create({ data: result.data })

  return { client }
}
