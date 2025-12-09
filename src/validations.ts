import { type ListCLientQueryParams } from "./interfaces.ts"

/* Available fields to filter with are
 - pesel
 - firstName
 - lastName
 - status

 Available filters are:
 - pesel:
    - eq: string
    - in: string[]
 - firstName
    - eq: string
    - in: string[]
 - lastName
    - eq: string
    - in: string[]
 - status
    - eq: string
    - in: string[]
*/ 
export function validateListClientsParams(queryParams: ListCLientQueryParams) {
}
