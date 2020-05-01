import availableItems from '../data/items.json'
import { KnownClaimedItem, KnownItem, UnknownItem, UnknownClaimedItem, PlayersItem, OpponentsItem, Indexed } from '../../shared/model/item'

export function getRandomItem(from: string[] = availableItems): string {
    return from[Math.floor(Math.random() * from.length)]
}

export function getRandomItems(ammount: number, from: string[] = availableItems): string[] {
    return Array.from({ length: ammount }).map(() => getRandomItem(from))
}

export class Item {
    constructor(private actualName: string, private claimedName: string | undefined = undefined) {
    }
    
    claimAs(name: string) {
        this.claimedName = name
    }

    asKnown(): PlayersItem{
        return {
            type: 'known-item',
            name: this.actualName,
            ...(!!this.claimedName ? { claimedAs: this.claimedName } : {})
        }
    }

    asKnownIndexed(index: number): PlayersItem & Indexed {
        return {
            ...this.asKnown(),
            index
        }
    }

    asUnknown(): OpponentsItem {
        return {
            type: 'unknown-item',
            ...(!!this.claimedName ? { claimedAs: this.claimedName } : {})
        }
    }

    asUnknownIndexed(index: number): OpponentsItem & Indexed {
        return {
            ...this.asUnknown(),
            index
        }
    }

    get isClaimed() {
        return !!this.claimedName
    }

    get name() {
        return this.actualName
    }

    get claimedAs() {
        return this.claimedName
    }
}
