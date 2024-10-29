import { getPlayers, savePlayer } from '../models/usersModel'
import { IRegRequest, wsMessages } from '../types/wsTypes'

export const wsRegAction = (
    message: wsMessages,
    callback: (data: string) => void
) => {
    let data = message.data

    if (typeof data === 'string') {
        data = JSON.parse(data)
    }

    const player = savePlayer(data as IRegRequest)
    // console.log(getPlayers(), player)
    console.log("Command " + 'reg', player)

    if (!player) {
        callback(
            JSON.stringify({
                type: 'reg',
                data: JSON.stringify({
                    name: '',
                    index: 0,
                    error: true,
                    errorText: `User already exists`,
                }),
                id: 0,
            })
        )
    } else {
        callback(
            JSON.stringify({
                type: 'reg',
                data: JSON.stringify({
                    name: player.name,
                    index: player.index,
                    error: false,
                    errorText: '',
                }),
                id: 0,
            })
        )
    }
    return player
}
