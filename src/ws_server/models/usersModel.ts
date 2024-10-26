import { IRegRequest } from '../types/wsTypes'

export interface IUser {
    name: string
    password: string
    index?: number
}

const players = new Map<string, IUser>()
let index = 0

export const savePlayer = (data: IRegRequest): IUser | undefined => {
    const player = players.get(data.name)

    if (!player) {
        index += 1
        players.set(data.name, {
            name: data.name,
            password: data.password,
            index: index,
        })
        console.log(players, players.get(data.name))
        return players.get(data.name)
    } else {
        return undefined
    }
}
