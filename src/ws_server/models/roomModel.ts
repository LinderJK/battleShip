import { IUser } from './usersModel'

export const rooms = new Map<number, IUser[]>()

export const addUserToRoom = (roomId: number, user: IUser) => {
    if (rooms.has(roomId)) {
        rooms.get(roomId)?.push(user)
    }
    // console.log(rooms, 'CHECK ROOM')
}

export const getRoomUsers = (roomId: number) => {
    return rooms.get(roomId)
}

export const createRoom = (user: IUser) => {
    const roomId = user.index
    rooms.set(roomId, [user])
    // console.log(rooms, 'CHECK ROOM')
    return roomId
}

export const getRoom = (roomId: number | undefined) => {
    if (roomId) {
        return rooms.get(roomId)
    }
    // console.log(rooms, 'CHECK ROOM')
}

export const deleteRooms = (roomId: Array<number | undefined>) => {
    roomId.forEach((id) => {
        if (id) {
            rooms.delete(id)
        }
    })
}

export const getAllRooms = () => {
    return Array.from(rooms.entries())
        .filter(([_, users]) => users.length > 0)
        .map(([roomId, roomUsers]) => ({ roomId, roomUsers }))
}
