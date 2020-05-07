import io from 'socket.io-client'
import { MessageType, UserMessage } from '../shared/model/message'
import { StartingData, ClaimItemRequest, ClaimItemResponse, ClaimItemSuccessResponse, OfferResponse, OfferRequest, Offer, CancelOfferResponse, CancelOfferSuccessResponse, OfferSuccessResponse, RejectOfferSuccessResponse, RejectOfferResponse, AcceptOfferSuccessResponse, AcceptOfferResponse, Victory } from '../shared/model/game'
import { performActionWithResponse, performAction } from './performAction'
import { Callback, UnsubscribeFn, subscribe } from './subscribe'

const socket = io()

// Lobby

export function subscribeForRandomQueueSize(onUpdate: Callback<number>): UnsubscribeFn {
    socket.emit('matchMaking/queue/size/request')
    return subscribe(socket, 'matchMaking/queue/size', onUpdate)
}

export function joinRandomQueue(username: string): Promise<void> {
    return performAction({
        socket,
        reqEvent: 'matchMaking/queue/join',
        resEvent: 'matchMaking/queue/joined',
        data: username
    })
}

export function subscribeForGameJoin(onUpdate: Callback<void>): UnsubscribeFn {
    return subscribe(socket, 'matchMaking/joinedGame', onUpdate)
}

// Game chat

export function subscribeForChatMessage(onUpdate: Callback<MessageType>): UnsubscribeFn {
    return subscribe(socket, 'game/receivedMessage', onUpdate)
}

export function sendMessage(content: string): void {
    socket.emit('game/sendMessage', content)
}

// Game

export function getStartingData(): Promise<StartingData> {
    return performAction({
        socket,
        reqEvent: 'game/startingData/request',
        resEvent: 'game/startingData'
    })
}

export function claimItem(itemIndex: number, asItem: string): Promise<ClaimItemSuccessResponse> {
    const request: ClaimItemRequest = { itemIndex, asItem }

    return performActionWithResponse({
        socket,
        reqEvent: 'game/claimItem',
        resEvent: 'game/claimedItem',
        data: request
    })
}

// Game - offers

export function makeOffer(toPlayer: string, playerItemIndex: number, opponentItemIndex: number): Promise<OfferSuccessResponse> {
    const request: OfferRequest = { toPlayer, playerItemIndex, opponentItemIndex }

    return performActionWithResponse({
        socket,
        reqEvent: 'game/makeOffer',
        resEvent: 'game/madeOffer',
        data: request
    })
}

export function subscribeForOffers(onUpdate: Callback<Offer>): UnsubscribeFn {
    return subscribe(socket, 'game/gotOffer', onUpdate)
}

export function cancelOffer(id: string): Promise<CancelOfferSuccessResponse> {
    return performActionWithResponse({
        socket,
        reqEvent: 'game/cancelOffer',
        resEvent: 'game/canceledOwnOffer',
        data: id
    })
}

export function subscribeForCancelledOffers(onUpdate: Callback<CancelOfferSuccessResponse>): UnsubscribeFn {
    return subscribe(socket, 'game/canceledOffer', onUpdate)
}

export function rejectOffer(id: string): Promise<RejectOfferSuccessResponse> {
    return performActionWithResponse({
        socket,
        reqEvent: 'game/rejectOffer',
        resEvent: 'game/rejectedOwnOffer',
        data: id
    })
}

export function subscribeForRejectedOffers(onUpdate: Callback<RejectOfferSuccessResponse>): UnsubscribeFn {
    return subscribe(socket, 'game/rejectedOffer', onUpdate)
}

export function acceptOffer(id: string): Promise<AcceptOfferSuccessResponse> {
    return performActionWithResponse({
        socket,
        reqEvent: 'game/acceptOffer',
        resEvent: 'game/acceptedOwnOffer',
        data: id
    })
}

export function subscribeForAcceptedOffers(onUpdate: Callback<AcceptOfferSuccessResponse>): UnsubscribeFn {
    return subscribe(socket, 'game/acceptedOffer', onUpdate)
}

// Game - victory

export function onGameEnd(): Promise<Victory> {
    return new Promise<Victory>(resolve => socket.on('game/end', (data: Victory) => {
        socket.removeListener('game/end');
        resolve(data)
    }));
}