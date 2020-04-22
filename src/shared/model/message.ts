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
    item: string
}

interface Trader {
    name: string,
    item: string
}

export interface Transaction {
    type: 'transaction',
    user1: Trader,
    user2: Trader
}

export type MessageType = UserMessage | ItemDeclaration | Transaction
