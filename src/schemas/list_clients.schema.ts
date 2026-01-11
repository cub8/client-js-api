import { z } from "zod"
import { Status } from "@prisma/client"

const stringArray = z.preprocess((val) => {
  if (typeof val === "string") return [val]
  return val
}, z.array(z.string()))

const statusEnum = z.enum(Status)

const caseInsensitiveStatus = z.preprocess((val) => {
  if (typeof val === "string") return val.toUpperCase()
  return val
}, statusEnum)

const statusArray = z.preprocess((val) => {
  if (typeof val === "string") return [val]
  return val
}, z.array(caseInsensitiveStatus))

export const listClientsSchema = z.object({
  firstNameEq: z.string().optional(),
  lastNameEq: z.string().optional(),
  peselEq: z.string().optional(),
  statusEq: caseInsensitiveStatus.optional(),

  firstNameIn: stringArray.optional(),
  lastNameIn: stringArray.optional(),
  peselIn: stringArray.optional(),
  statusIn: statusArray.optional(),
})

export type ListClientsInput = z.infer<typeof listClientsSchema>
