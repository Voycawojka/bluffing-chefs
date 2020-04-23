import { PlayersItem, KnownClaimedItem, UnknownClaimedItem } from "./item";

export interface StartingData {
    items: PlayersItem[]
    neededItems: string[]
    allItems: string[]
    players: string[]
}

// Claim Item

export interface ClaimItemRequest {
    itemIndex: number
    asItem: string
}

export interface ClaimItemSuccessResponse {
    success: true
    itemData: KnownClaimedItem
}

export interface ClaimItemErrorResponse {
    success: false
    errorMessage: string
}

export type ClaimItemResponse = ClaimItemSuccessResponse | ClaimItemErrorResponse

// Offer

export interface Offer {
    id: string
    from: string
    to: string
    offeredItemIndex: number
    forItemIndex: number
}

export interface OfferRequest {
    toPlayer: string
    playerItemIndex: number
    opponentItemIndex: number
}

export interface OfferSuccessResponse {
    success: true
    offerData: Offer
}

export interface OfferErrorResponse {
    success: false
    errorMessage: string
}

export type OfferResponse = OfferErrorResponse

export interface CancelOfferSuccessResponse {
    status: true
}

export interface CancelOfferErrorResponse {
    status: false
    errorMessage: string
}

export type CancelOfferResponse = CancelOfferSuccessResponse | CancelOfferErrorResponse
