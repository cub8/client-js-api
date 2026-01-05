const clientListParams = ["pesel", "firstName", "lastName", "status"] as const
type ClientListKey = (typeof clientListParams)[number]
type ClientListQueryKey = `${ClientListKey}Eq` | `${ClientListKey}In`
export type ClientListOutParams = Partial<Record<ClientListQueryKey, string | string[] | undefined>>
type ClientListValidationResult = { valid: true; message?: string; params: ClientListOutParams } | { valid: false; message: string; params?: ClientListOutParams }
export type RawClientListQuery = Partial<Record<ClientListQueryKey, unknown>>

// W sumie to In nie musi być arrayem - wystarczy zamieniać go na array :P 
// Do zrobienia jutro Jeremiaszu
export function validateListClientsParams(queryParams: RawClientListQuery): ClientListValidationResult {
   const params: ClientListOutParams = {}

   for (const param of clientListParams) {
      const eqFilterKey = `${param}Eq` as `${ClientListKey}Eq`;
      const inFilterKey = `${param}In` as `${ClientListKey}In`;
      const eqFilterValue = queryParams[eqFilterKey];
      const inFilterValue = queryParams[inFilterKey];

      if (eqFilterValue && Array.isArray(eqFilterValue)) {
         return { valid: false, message: `${eqFilterKey} must be a string.` }
      }

      if (inFilterValue) {
         if (Array.isArray(inFilterValue)) {
            params[inFilterKey] = inFilterValue
         }
         else {
            params[inFilterKey] = [inFilterValue as string]
         }
      }

      params[eqFilterKey] = eqFilterValue as string
   }

   return { valid: true, params }
}
