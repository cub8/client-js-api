import { z } from "zod"
import { removeUndefinedFieldsTransformer } from "@src/utils/remove_undefined_fields_transformer"

export const updateClientSchema = z.object({
  firstName: z.string()
    .min(1, "First name must be min 1 character long")
    .max(40, "First name must be max 40 characters long")
    .optional(),
  lastName: z.string()
    .min(1, "Last name must be min 1 characters long")
    .max(80, "Last name must be max 80 characters long")
    .optional(),
  pesel: z.string()
    .length(11, "PESEL must be exactly 11 character long")
    .regex(/^\d+$/, "PESEL must contain only digits")
    .optional(),
}).transform(removeUndefinedFieldsTransformer)

export type UpdateClientInput = z.infer<typeof updateClientSchema>
