import { z } from "zod"

export const createIntegrationSchema = z.object({
  type: z.enum(["API", "INTERNAL"]),
})

export type CreateIntegrationInput = z.infer<typeof createIntegrationSchema>
