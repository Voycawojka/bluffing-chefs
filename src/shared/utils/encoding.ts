export function base64Encode(text: string): string {
    return Buffer.from(text).toString('base64')
}
