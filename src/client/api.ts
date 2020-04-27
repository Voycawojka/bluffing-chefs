import io from 'socket.io-client'
import { MessageType, UserMessage } from '../shared/model/message'
import { StartingData, ClaimItemRequest, ClaimItemResponse, ClaimItemSuccessResponse, OfferResponse, OfferRequest, Offer, CancelOfferResponse, CancelOfferSuccessResponse, OfferSuccessResponse, RejectOfferSuccessResponse, RejectOfferResponse } from '../shared/model/game'

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

export function makeOffer(toPlayer: string, playerItemIndex: number, opponentItemIndex: number): Promise<OfferSuccessResponse> {
    return new Promise<OfferSuccessResponse>((resolve, reject) => {
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

export function cancelOffer(id: string): Promise<CancelOfferSuccessResponse> {
    return new Promise<CancelOfferSuccessResponse>((resolve, reject) => {
        socket.on('game/canceledOwnOffer', (response: CancelOfferResponse) => {
            socket.removeListener('game/canceledOwnOffer')

            if (response.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
        socket.emit('game/cancelOffer', id)
    })
}

export function subscribeForCancelledOffers(onUpdate: Callback<CancelOfferSuccessResponse>): UnsubscribeFn {
    socket.on('game/canceledOffer', (response: CancelOfferSuccessResponse) => onUpdate(response))
    return () => socket.removeListener('game/canceledOffer')
}

export function rejectOffer(id: string): Promise<RejectOfferSuccessResponse> {
    return new Promise<RejectOfferSuccessResponse>((resolve, reject) => {
        socket.on('game/rejectedOwnOffer', (response: RejectOfferResponse) => {
            socket.removeListener('game/rejectedOwnOffer')

            if (response.success) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    })
}

export function subscribeForRejectedOffers(onUpdate: Callback<RejectOfferSuccessResponse>): UnsubscribeFn {
    socket.on('game/rejectedOffer', (response: RejectOfferSuccessResponse) => onUpdate(response))
    return () => socket.removeListener('game/rejectedOffer')
}
