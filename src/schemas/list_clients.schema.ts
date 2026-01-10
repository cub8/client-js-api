import { z } from "zod"

const stringArray = z.preprocess((val) => {
  if (typeof val === "string") return [val]
  return val
}, z.array(z.string()))

export const listClientsSchema = z.object({
  firstNameEq: z.string().optional(),
  lastNameEq: z.string().optional(),
  peselEq: z.string().optional(),
  statusEq: z.string().optional(),

  firstNameIn: stringArray.optional(),
  lastNameIn: stringArray.optional(),
  peselIn: stringArray.optional(),
  statusIn: stringArray.optional(),
})

export type ListClientsInput = z.infer<typeof listClientsSchema>
