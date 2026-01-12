import type { Integration } from "@prisma/client"
import prisma from "@src/prisma"
import { createIntegrationSchema } from "@src/schemas/create_integration.schema"
import { ValidationError } from "@src/utils/errors"
import { z } from "zod"

type CreateIntegrationParams = {
  type: string
}

type CreateIntegrationReturnType = {
  integration?: Integration
  error?: string[]
}

export default async function createIntegration(clientId: number, params: CreateIntegrationParams): Promise<CreateIntegrationReturnType> {
  await prisma.client.findUniqueOrThrow({
    where: { id: clientId },
  })

  const dataToValidate = { type: params.type }
  const result = createIntegrationSchema.safeParse(dataToValidate)

  if (!result.success) {
    throw new ValidationError(z.flattenError(result.error!).fieldErrors)
  }

  const integrationType = result.data.type
  const existingIntegration = await prisma.integration.findFirst({
    where: {
      id: clientId,
      type: integrationType,
    },
  })

  if (existingIntegration) {
    return { error: ["This type of integration already exists"] }
  }

  const integration = await prisma.integration.create({
    data: {
      type: integrationType,
      clientId,
    },
  })

  return { integration }
}
