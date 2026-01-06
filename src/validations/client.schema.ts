import { z } from "zod"

export const createClientSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(40, "First name must be max 40 characters long"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(80, "Last name must be max 80 characters long"),
  pesel: z.string()
    .length(11, "PESEL must be exactly 11 character long")
    .regex(/^\d+$/, "PESEL must contain only digits"),
  status: z.enum(["REGISTERED", "INTEGRATED", "RESIGNED"]),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
