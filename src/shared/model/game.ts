import { PlayersItem, KnownClaimedItem, UnknownClaimedItem, KnownItem } from "./item";

export interface ErrorResponse {
    success: false
    errorMessage: string
}

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

export type ClaimItemResponse = ClaimItemSuccessResponse | ErrorResponse

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

export type OfferResponse = OfferSuccessResponse | ErrorResponse

export interface CancelOfferSuccessResponse {
    success: true
    id: string
}

export type CancelOfferResponse = CancelOfferSuccessResponse | ErrorResponse

export interface RejectOfferSuccessResponse {
    success: true
    id: string
}

export type RejectOfferResponse = RejectOfferSuccessResponse | ErrorResponse

export interface AcceptOfferSuccessResponse {
    success: true
    id: string
    gotItem: KnownItem
}

export type AcceptOfferResponse = AcceptOfferSuccessResponse | ErrorResponse
