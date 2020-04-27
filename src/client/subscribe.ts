export type UnsubscribeFn = () => void
export type Callback<T> = (value: T) => void

export function subscribe<T>(socket: SocketIOClient.Socket, event: string, onUpdate: Callback<T>): UnsubscribeFn {
    socket.on(event, (response: T) => onUpdate(response))
    return () => socket.removeListener(event)
}
