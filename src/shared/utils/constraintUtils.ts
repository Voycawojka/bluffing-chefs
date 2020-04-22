export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max
}

export function stringInRange(string: string, min: number, max: number): boolean {
    return inRange(string.length, min, max)
}
