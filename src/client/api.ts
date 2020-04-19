import io from 'socket.io-client'

const socket = io()

export type NumberCallback = (value: number) => void
export type VoidCallback = () => void
export type UnsubscribeFn = () => void

export function subscribeForRandomQueueSize(onUpdate: NumberCallback): UnsubscribeFn {
    socket.on('matchMaking/queue/size', (size: number) => onUpdate(size))
    socket.emit('matchMaking/queue/size/request')
    return () => socket.removeListener('matchMaking/queue/size')
}

export function joinRandomQueue(username: string, onJoin: VoidCallback) {
    socket.on('matchMaking/queue/joined', () => {
        socket.removeListener('matchMaking/queue/joined')
        onJoin()
    })
    socket.emit('matchMaking/queue/join', username)
}
