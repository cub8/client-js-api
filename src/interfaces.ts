export type Status = "REGISTERED" | "INTEGRATED" | "RESIGNED"
export type IntegrationType = "API" | "INTERNAL"

export interface ListCLientQueryParams {
  peselEq?: string
  peselIn?: string[]
  firstNameEq?: string
  firstNameIn?: string[]
  lastNameEq?: string
  lastNameIn?: string[]
  statusEq?: string
  statusIn?: string[]
}

export interface ListIntegrationsQueryParams {

}

export interface ClientParams {
  firstName: string
  lastName: string
  pesel: string
}

export interface Client {
  id: number
  firstName: string
  lastName: string
  pesel: string
  status: Status
  note: string | null
  createdAt: Date
  updatedAt: Date | null
}

export interface Integration {
  type: IntegrationType
  createdAt: Date
  id: number
  clientId: number
}

export interface ClientWithIntegrations extends Client {
  integrations: Integration[]
}
