import { WebSocketServer } from 'ws'
import * as WebSocket from 'ws'
import { wsMessages } from './types/wsTypes'
import { wsRegAction } from './actions/wsRegAction'
import {
    wsAddUserToRoomAction,
    wsCreateRoomAction,
    wsUpdateRoomAction,
} from './actions/wsRoomAction'
import { createClient, deleteClient, IClient } from './models/wsClientsModel'
import { deleteRooms } from './models/roomModel'

const PORT = 3000

const wsServer = new WebSocketServer({ port: PORT })

wsServer.on('connection', (ws: WebSocket) => {
    console.log(`Client connected`)

    const sendCallback = (data: string) => {
        ws.send(data)
    }

    const broadcastCallback = (data: string) => {
        console.log(wsServer.clients.size)
        wsServer.clients.forEach((client) => {
            client.send(data)
        })
    }

    let currentClient: IClient

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString()) as wsMessages

        switch (data.type) {
            case 'reg': {
                const player = wsRegAction(data, sendCallback)

                if (player) {
                    const client = createClient(player.index, player.name, ws)
                    if (client) currentClient = client
                }
                wsUpdateRoomAction(broadcastCallback)
                break
            }
            case 'create_room': {
                console.log(JSON.parse(message.toString()))
                wsCreateRoomAction(currentClient, sendCallback)
                wsUpdateRoomAction(broadcastCallback)
                break
            }
            case 'add_user_to_room': {
                console.log(data)
                wsAddUserToRoomAction(currentClient, data)
                wsUpdateRoomAction(broadcastCallback)
                break
            }
        }
    })

    ws.on('close', () => {
        console.log(`Client disconnected`)
        if (currentClient) {
            deleteClient(currentClient.index)
            deleteRooms([currentClient.index])
            wsUpdateRoomAction(broadcastCallback)
        }
    })
})

wsServer.on('listening', () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`)
})

const wsShutdown = () => {
    console.log(
        '\n' + 'Shutting down WebSocket server on ws://localhost:' + PORT
    )
    wsServer.close(() => {
        console.log('WebSocket server closed.')
        process.exit(0) // Завершаем процесс TODO: поменять, некорретно работает
    })
}
process.on('SIGINT', wsShutdown)
process.on('SIGTERM', wsShutdown)

export default wsServer
