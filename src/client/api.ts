import io from 'socket.io-client'
import { MessageType, UserMessage } from '../shared/model/message'
import { StartingData } from '../shared/model/game'

const socket = io()

export type VoidCallback = () => void
export type Callback<T> = (value: T) => void
export type UnsubscribeFn = () => void

export function subscribeForRandomQueueSize(onUpdate: Callback<number>): UnsubscribeFn {
    socket.on('matchMaking/queue/size', (size: number) => onUpdate(size))
    socket.emit('matchMaking/queue/size/request')
    return () => socket.removeListener('matchMaking/queue/size')
}

export function joinRandomQueue(username: string, onJoin: VoidCallback): void {
    socket.on('matchMaking/queue/joined', () => {
        socket.removeListener('matchMaking/queue/joined')
        onJoin()
    })
    socket.emit('matchMaking/queue/join', username)
}

export function subscribeForGameJoin(onUpdate: VoidCallback): UnsubscribeFn {
    socket.on('matchMaking/joinedGame', () => onUpdate())
    return () => socket.removeListener('matchMaking/joinedGame')
}

export function subscribeForChatMessage(onUpdate: Callback<MessageType>): UnsubscribeFn {
    socket.on('game/receivedMessage', (message: MessageType) => onUpdate(message))
    return () => socket.removeListener('game/receivedMessage')
}

export function sendMessage(message: UserMessage): void {
    socket.emit('game/sendMessage', message)
}

export function getStartingData(onGot: Callback<StartingData>): void {
    socket.on('game/startingData', (data: StartingData) => {
        socket.removeListener('game/startingData')
        onGot(data)
    })
    socket.emit('game/startingData/request')
}
