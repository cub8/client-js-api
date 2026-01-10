import { z } from "zod"

export const updateClientStatusSchema = z.object({
  status: z.enum(["REGISTERED", "INTEGRATED", "RESIGNED"]),
})

export type UpdateClientStatusInput = z.infer<typeof updateClientStatusSchema>
