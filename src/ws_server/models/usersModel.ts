import { IRegRequest } from '../types/wsTypes'

export interface IUser {
    name: string
    // password: string
    index: number
}

const players = new Map<string, IUser>()
let index = 0

export const savePlayer = (data: IRegRequest): IUser | undefined => {
    const player = players.get(data.name)

    if (!player) {
        index += 1
        const newUser: IUser = {
            name: data.name,
            // password: data.password,
            index: index,
        }
        // console.log(newUser, index, 'INDEX')
        players.set(data.name, newUser)
        // console.log(players, newUser)
        return newUser
    } else {
        return undefined
    }
}

export const getPlayers = () => {
    return players
}

export const getPlayer = (name: string | undefined) => {
    if (name) {
        return players.get(name)
    }
}
