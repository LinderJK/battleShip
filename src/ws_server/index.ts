import { WebSocketServer } from 'ws'

import { wsMessages } from './types/wsTypes'
import { wsRegAction } from './actions/wsRegAction'

const PORT = 3000

const wsServer = new WebSocketServer({ port: PORT })

wsServer.on('connection', (ws) => {
    console.log('Client connected')

    const callback = (data: string) => {
        ws.send(data)
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString()) as wsMessages

        switch (data.type) {
            case 'reg': {
                wsRegAction(data, callback)
                break
            }
            case 'create_room': {
                break
            }
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
        process.exit(0) // Завершаем процесс
    })
}
process.on('SIGINT', wsShutdown)
process.on('SIGTERM', wsShutdown)

export default wsServer
