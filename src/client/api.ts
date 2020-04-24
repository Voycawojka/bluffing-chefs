import io from 'socket.io-client'
import { MessageType, UserMessage } from '../shared/model/message'
import { StartingData, ClaimItemRequest, ClaimItemResponse, ClaimItemSuccessResponse, OfferResponse, OfferRequest, Offer } from '../shared/model/game'

const socket = io()

export type VoidCallback = () => void
export type Callback<T> = (value: T) => void
export type UnsubscribeFn = () => void

// Lobby

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

// Game chat

export function subscribeForChatMessage(onUpdate: Callback<MessageType>): UnsubscribeFn {
    socket.on('game/receivedMessage', (message: MessageType) => onUpdate(message))
    return () => socket.removeListener('game/receivedMessage')
}

export function sendMessage(content: string): void {
    socket.emit('game/sendMessage', content)
}

// Game

export function getStartingData(): Promise<StartingData> {
    return new Promise<StartingData>(resolve => {
        socket.on('game/startingData', (data: StartingData) => {
            socket.removeListener('game/startingData')
            resolve(data)
        })
        socket.emit('game/startingData/request')
    })
}

export function claimItem(itemIndex: number, asItem: string): Promise<ClaimItemSuccessResponse> {
    return new Promise<ClaimItemSuccessResponse>((resolve, reject) => {
        socket.on('game/claimedItem', (response: ClaimItemResponse) => {
            socket.removeListener('game/claimedItem')
            
            if (response.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    
        const request: ClaimItemRequest = { itemIndex, asItem }
        socket.emit('game/claimItem', request)
    })
}

export function makeOffer(toPlayer: string, playerItemIndex: number, opponentItemIndex: number): Promise<OfferResponse> {
    return new Promise<OfferResponse>((resolve, reject) => {
        socket.on('game/madeOffer', (response: OfferResponse) => {
            socket.removeListener('game/madeOffer')

            if (response.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })

        const request: OfferRequest = { toPlayer, playerItemIndex, opponentItemIndex }
        socket.emit('game/makeOffer', request)
    })
}

export function subscribeForOffers(onUpdate: Callback<Offer>): UnsubscribeFn {
    socket.on('game/gotOffer', (offer: Offer) => onUpdate(offer))
    return () => socket.removeListener('game/gotOffer')
}

export function cancelOffer(id: string): void {
    socket.emit('game/cancelOffer', id)
}

export function subscribeForCancelledOffers(onUpdate: Callback<OfferResponse>): UnsubscribeFn {
    socket.on('game/canceledOffer', (offer: OfferResponse) => onUpdate(offer))
    return () => socket.removeListener('game/canceledOffer')
}
