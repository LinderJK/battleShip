import { IClient } from '../models/wsClientsModel'
import { getPlayer } from '../models/usersModel'
import {
    createRoom,
    getAllRooms,
    getRoom,
    getRoomUsers,
} from '../models/roomModel'

export const wsCreateRoomAction = (
    currentClient: IClient,
    sendCallback: (data: string) => void
) => {
    const player = getPlayer(currentClient.name)

    if (player) {
        const roomId = player.index
        if (!getRoom(roomId)) {
            console.log('CREATE ROOM')
            createRoom(player)
        } else {
            //добавление
        }

        console.log('SEND INFO')
        sendCallback(
            JSON.stringify({
                type: 'create_room',
                data: JSON.stringify({
                    roomId,
                    players: getRoomUsers(roomId),
                    name: `${player.name} room`,
                }),
                id: 0,
            })
        )
    } else {
        sendCallback(
            JSON.stringify({
                type: 'error',
                message: 'Player not found.',
            })
        )
    }
}

export const wsUpdateRoomAction = (
    currentClient: IClient,
    sendCallback: (data: string) => void
) => {
    const roomsData = getAllRooms()
    const updateMessage = JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(roomsData),
        id: 0,
    })

    sendCallback(updateMessage)
}
