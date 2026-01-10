import type { Client } from "@prisma/client"
import prisma from "@src/prisma"
import { createClientSchema } from "@/src/validations/create_client.schema"
import { z } from "zod"

interface CreateClientParams {
  firstName: string
  lastName: string
  pesel: string
}

type CreateClientError = {
  pesel?: string[]
  firstName?: string[]
  lastName?: string[]
}

type CreateClientReturnType = {
  client?: Client
  error?: CreateClientError
}

export default async function createClient(params: CreateClientParams): Promise<CreateClientReturnType> {
  const dataToValidate = {
    firstName: params.firstName || "",
    lastName: params.lastName || "",
    pesel: params.pesel,
  }

  const result = createClientSchema.safeParse(dataToValidate)

  if (!result.success) {
    return {
      error: z.flattenError(result.error!).fieldErrors,
    }
  }

  const client = await prisma.client.create({
    data: {
      ...result.data,
      status: "REGISTERED",
    },
  })

  return { client }
}
