import { Socket } from 'socket.io'
import { Equipment } from './equipment'

export interface Player {
    socket: Socket,
    username: string
}

export interface PlayerStore {
    [id: string]: Player
}

export const players: PlayerStore = {}

export class InGamePlayer {
    socket: Socket
    username: string
    items: Equipment = new Equipment()
    neededItems: string[] = []

    constructor(player: Player) {
        this.socket = player.socket
        this.username = player.username
    }
}

export function isUsernameTaken(name: string): boolean {
    return !!Object.values(players).find(player => player.username === name)
}
