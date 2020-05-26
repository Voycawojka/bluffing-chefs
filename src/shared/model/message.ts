import { UnknownClaimedItem, Indexed } from './item'

export interface UserMessage {
    type: 'user-message',
    user: string,
    time: number,
    content: string
}

export interface ItemDeclaration {
    type: 'item-declaration',
    user: string,
    time: number,
    item: UnknownClaimedItem & Indexed
}

interface Trader {
    name: string,
    item: UnknownClaimedItem & Indexed
}

export interface Transaction {
    type: 'transaction',
    user1: Trader,
    user2: Trader
}

export interface Prompt {
    type: 'prompt',
    content: string
}

export type MessageType = UserMessage | ItemDeclaration | Transaction | Prompt
