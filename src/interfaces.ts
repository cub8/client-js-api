export type Status = "REGISTERED" | "INTEGRATED" | "RESIGNED"
export type IntegrationType = "API" | "INTERNAL"

export interface ListCLientQueryParams {

}

export interface ListIntegrationsQueryParams {

}

export interface ClientParams {
    first_name: string,
    last_name: string,
    pesel: string
}

export interface Client {
    id: number,
    first_name: string,
    last_name: string,
    pesel: string,
    status: Status,
    note: string | null,
    createdAt: Date,
    updatedAt: Date | null,
}

export interface Integration {
    type: IntegrationType,
    createdAt: Date,
    id: number,
    clientId: number,
}

export interface ClientWithIntegrations extends Client {
    integrations: Integration[],
}
