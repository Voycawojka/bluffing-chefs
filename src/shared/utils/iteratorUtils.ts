export function getFirstN<T>(iterator: Iterator<T>, n: number): T[] {
    const elements: T[] = []

    for (let i = 0; i < n; i ++) {
        const result = iterator.next()
        
        if (result.done) {
            break
        }

        elements.push(result.value)
    }

    return elements
}
