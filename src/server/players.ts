import { Socket } from 'socket.io'

export interface Player {
    socket: Socket,
    username: string
}

export interface PlayerStore {
    [id: string]: Player
}
