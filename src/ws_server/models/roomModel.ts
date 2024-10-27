import { IUser } from './usersModel'

export const rooms = new Map<number, IUser[]>()

export const addUserToRoom = (roomId: number, user: IUser) => {
    if (rooms.has(roomId)) {
        rooms.get(roomId)?.push(user)
    } else {
        rooms.set(roomId, [user])
    }
}

export const getRoomUsers = (roomId: number) => {
    return rooms.get(roomId)
}

export const createRoom = (user: IUser) => {
    const roomId = user.index
    rooms.set(roomId, [user])
    return roomId
}

export const getRoom = (roomId: number) => {
    return rooms.get(roomId)
}

const deleteRoom = (roomId: number) => {
    rooms.delete(roomId)
}

export const getAllRooms = () => {
    return Array.from(rooms.entries())
        .filter(([_, users]) => users.length > 0)
        .map(([roomId, roomUsers]) => ({ roomId, roomUsers }))
}
