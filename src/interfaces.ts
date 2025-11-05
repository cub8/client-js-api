export type Status = "registered" | "integrated" | "resigned"

export interface ListCLientQueryParams {

}

export interface ListIntegrationsQueryParams {

}

export interface Client {
    id: number,
    first_name: string,
    last_name: string,
    pesel: string,
    status: Status
}

export interface ClientParams {
    first_name: string,
    last_name: string,
    pesel: string
}
