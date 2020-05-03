import { Item } from "./items";
import { PlayersItem } from "../../shared/model/item";

export class Equipment {
    private items: Item[] = []

    set(itemNames: string[]) {
        this.items.push(...itemNames.map(name => new Item(name)))
    }

    aasKnown(): PlayersItem[] {
        return this.items.map(item => item.asKnown())
    }

    get(index: number): Item {
        return this.items[index]
    }

    exchange(index: number, eq: Equipment, index2: number): void {
        const item = this.get(index)
        const item2 = eq.get(index2)

        this.items[index] = item2
        eq.items[index2] = item
    }
}
