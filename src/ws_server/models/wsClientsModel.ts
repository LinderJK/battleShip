import * as WebSocket from 'ws'

export interface IClient {
    name: string
    ws: WebSocket
    index?: number
}
export const clients = new Map<number, IClient>()

export const getClients = () => {
    return clients
}

export const createClient = (id: number, name: string, ws: WebSocket) => {
    clients.set(id, { name, ws, index: id })
    return clients.get(id)
}

export const deleteClient = (id: number | undefined) => {
    if (id) {
        clients.delete(id)
    }
}

export const getClient = (id: number | undefined) => {
    if (id) {
        return clients.get(id)
    }
}
