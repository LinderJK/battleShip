export interface IRegRequest {
    name: string
    password: string
}

export interface IRegResponse {
    name: string
    index: number | string | null
    error: boolean
    errorText: string
}

export interface IUpdateWinners {
    name: string
    wins: number
}

export type wsPayload = IRegRequest | IRegResponse

export interface wsMessages {
    type: string
    data: wsPayload
    id: number
}
