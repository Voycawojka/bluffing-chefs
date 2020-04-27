interface Response {
    success: boolean
}

interface SuccessResponse {
    success: true
}

interface PerformActionData {
    socket: SocketIOClient.Socket
    reqEvent: string
    resEvent: string
    data?: any
}

export function performAction<T>(args: PerformActionData): Promise<T> {
    return new Promise<T>(resolve => {
        args.socket.on(args.resEvent, (data: T) => {
            args.socket.removeListener(args.resEvent)
            resolve(data)
        })
        args.socket.emit(args.reqEvent)
    })
}

export function performActionWithResponse<R extends Response, S extends SuccessResponse>(args: PerformActionData): Promise<S> {
    return new Promise<S>((resolve, reject) => {
        args.socket.on(args.resEvent, (response: R) => {
            args.socket.removeListener(args.resEvent)

            if (response.success) {
                resolve(response as unknown as S)
            } else {
                reject(response)
            }
        })
        args.socket.emit(args.reqEvent, args.data)
    })
}
