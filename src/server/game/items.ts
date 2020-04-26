import availableItems from '../data/items.json'

export function getRandomItem(from: string[] = availableItems): string {
    return from[Math.floor(Math.random() * from.length)]
}

export function getRandomItems(ammount: number, from: string[] = availableItems): string[] {
    return Array.from({ length: ammount }).map(() => getRandomItem(from))
}
