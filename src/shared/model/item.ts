export interface KnownItem {
    type: 'known-item'
    name: string
}

export interface KnownClaimedItem {
    type: 'known-claimed-item'
    name: string
    claimedAs: string
}

export interface UnknownItem {
    type: 'unknown-item'
}

export interface UnknownClaimedItem {
    type: 'unknown-claimed-item'
    claimedAs: string
}

export type PlayersItem = KnownItem | KnownClaimedItem

export type OpponentsItem = UnknownItem | UnknownClaimedItem
