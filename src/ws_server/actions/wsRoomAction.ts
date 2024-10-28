import { IClient } from '../models/wsClientsModel'
import { getPlayer } from '../models/usersModel'
import {
    addUserToRoom,
    createRoom,
    deleteRooms,
    getAllRooms,
    getRoom,
    getRoomUsers,
} from '../models/roomModel'
import { wsMessages } from '../types/wsTypes'

export const wsCreateRoomAction = (
    currentClient: IClient,
    sendCallback: (data: string) => void
) => {
    const player = getPlayer(currentClient.name)

    if (player) {
        const roomId = player.index
        if (!getRoom(roomId)) {
            createRoom(player)
        } else {
            //заглушка под ошибку
        }

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

export const wsUpdateRoomAction = (callback: (data: string) => void) => {
    const roomsData = getAllRooms()
    const updateMessage = JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(roomsData),
        id: 0,
    })

    callback(updateMessage)
}

export const wsAddUserToRoomAction = (
    currentClient: IClient,
    message: wsMessages
) => {
    const player = getPlayer(currentClient.name)
    const data =
        typeof message.data === 'string'
            ? JSON.parse(message.data)
            : message.data

    // console.log('MESSAGE ADDD USER TO ROOM', data, message)
    // console.log('ADD USER TO ROOM', data)
    if (player) {
        // console.log('PLAYER want to room', player)
        const roomId = data.indexRoom
        // console.log('ROOM ID', roomId, data.indexRoom, typeof data.indexRoom)
        if (getRoom(roomId)) {
            // console.log('START add user', roomId, player)
            addUserToRoom(roomId, player)
            deleteRooms([roomId, player.index])
        }
    }
}
