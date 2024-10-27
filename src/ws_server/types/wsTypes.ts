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

type TUpdateWinners = Array<IUpdateWinners>

export interface ICreateRoomRequest {
    type: 'create_room'
    data: string
    id: number
}

export interface IAddUserToRoomRequest {
    indexRoom: number | string
}

export interface IUpdateRoomResponse {
    type: 'update_room'
    data: Array<{
        roomId: number | string
        roomUsers: Array<{
            name: string
            index: number | string
        }>
    }>
    id: number
}

export interface ICreateGameResponse {
    idGame: number | string
    idPlayer: number | string
}

export type wsPayload =
    | IRegRequest
    | IRegResponse
    | TUpdateWinners
    | ICreateRoomRequest
    | IAddUserToRoomRequest
    | ICreateGameResponse
    | IUpdateRoomResponse

export interface wsMessages {
    type: string
    data: wsPayload | string
    id: number
}
