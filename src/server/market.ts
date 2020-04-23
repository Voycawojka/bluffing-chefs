import { Offer } from "../shared/model/game";

export class Market {
    private offers: Offer[] = []

    addOffer(from: string, to: string, offeredItemIndex: number, forItemIndex: number): Offer | null {
        if (this.isAlreadyOffered(from, offeredItemIndex)) {
            return null
        }

        const id =  this.generateId()

        const offer = { id, from, to, offeredItemIndex, forItemIndex }
        this.offers.push(offer)

        return offer
    }

    getOffer(id: string): Offer | undefined {
        return this.offers.find(offer => offer.id === id)
    }

    cancelOffer(from: string, id: string): boolean {
        const leftOffers = this.offers.filter(offer => offer.from !== from || offer.id !== id)

        if (leftOffers.length === this.offers.length) {
            return false
        }

        this.offers = leftOffers
        return true
    }

    private isAlreadyOffered(player: string, itemIndex: number): boolean {
        return !!this.offers.find(offer => offer.from === player && offer.offeredItemIndex === itemIndex)
    }

    private generateId(): string {
        const id =  btoa('' + Math.random() * 10000)

        if (this.offers.map(offer => offer.id).includes(id)) {
            return this.generateId()
        }

        return id
    }
}
