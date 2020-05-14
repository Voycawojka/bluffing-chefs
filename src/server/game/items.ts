import { PlayersItem, OpponentsItem, Indexed } from '../../shared/model/item'

export function getRandomItem(from: string[]): string {
    return from[Math.floor(Math.random() * from.length)]
}

export function getRandomItems(ammount: number, from: string[], unique: boolean): string[] {
    const picks = Array.from({length: ammount })

    if (unique) {
        const pool = [...from]
        const picked: string[] = []

        picks.forEach(() => {
            const item = getRandomItem(pool);
            picked.push(item);
            pool.splice(pool.indexOf(item), 1);
        })

        return picked;
    }

    return picks.map(() => getRandomItem(from))
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
