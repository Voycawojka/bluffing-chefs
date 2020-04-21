export enum Style {
    bold, italic, strike, itemAsset
}

export interface TextBlock {
    content: string,
    styles: Style[]
}

type CharType = 'content' | 'mark'

interface Mark {
    start: string,
    end: string,
    style: Style
}

const marks: Mark[] = [
    { start: '*', end: '*', style: Style.bold },
    { start: '_', end: '_', style: Style.italic },
    { start: '~', end: '~', style: Style.strike },
    { start: '[', end: ']', style: Style.itemAsset }
]

function isWhitespace(char: string) {
    return /\s/.test(char)
}

export function arrayWithout<T>(array: T[], element: T): T[] {
    const newArray = array.slice()
    newArray.splice(array.indexOf(element), 1)
    return newArray
}

function sameArrays(array1: any[], array2: any[]): boolean {
    return array1.sort().join(',') === array2.sort().join(',')
}

function getMarkFromStyle(style: Style): Mark {
    const mark = marks.find(mark => mark.style === style)

    if (!mark) {
        return { start: '', end: '', style }
    }

    return mark
}

function getMarkFromStart(char: string): Mark | undefined {
    return marks.find(mark => mark.start === char)
}

function getMarkFromEnd(char: string): Mark | undefined {
    return marks.find(mark => mark.end === char)
}

function isCorrectStart(prev: string, end: string): boolean {
    return (isWhitespace(prev) || prev === '' ) && !isWhitespace(end) && end !== ''
}

function isCorrectEnd(prev: string, end: string, lastChar: CharType | undefined = undefined): boolean {
    return (isWhitespace(end) || end === '') && ((!isWhitespace(prev) && prev !== '') || lastChar === 'mark')
}

function removeEmptyBlocks(blocks: TextBlock[]): TextBlock[] {
    return blocks.filter(block => block.content !== '')
}

function mergeBlocks(blocks: TextBlock[]): TextBlock[] {
    const merged: TextBlock[] = [blocks[0]]

    blocks.slice(1, blocks.length).forEach(block => {
        const last = merged[merged.length - 1]

        if (sameArrays(last.styles, block.styles)) {
            last.content += block.content
        } else {
            merged.push(block)
        }
    })

    return merged
}

function getCharType(text: string, index: number): CharType {
    const char = text.charAt(index)
    const prev = text.charAt(index - 1)
    const next = text.charAt(index + 1)

    if ((isCorrectStart(prev, next) && getMarkFromStart(char) || (isCorrectEnd(prev, next) && getMarkFromEnd(char)))) {
        return 'mark'
    }

    return 'content'
}

export function parse(text: string): TextBlock[] {
    const blocks: TextBlock[] = []
    let currentBlock: TextBlock = { content: '', styles: [] }
    let lastCharType: CharType = 'content'

    text.split('').forEach((char: string, i: number) => {
        const prev = lastCharType === 'content' ? text.charAt(i - 1) : ''
        const next = getCharType(text, i + 1) === 'content' ? text.charAt(i + 1) : ''

        if (isCorrectStart(prev, next)) {
            const startMark = getMarkFromStart(char)
            
            if (startMark && !currentBlock.styles.includes(startMark.style)) {
                blocks.push(currentBlock)

                if (currentBlock.styles.length === 0) {
                    currentBlock = { content: '', styles: [startMark.style] }
                } else {
                    currentBlock = { content: '', styles: [...currentBlock.styles, startMark.style] }
                }

                lastCharType = 'mark'
                return
            }   
        } else if (isCorrectEnd(prev, next, lastCharType)) {
            const endMark = getMarkFromEnd(char)

            if (endMark && currentBlock.styles.includes(endMark.style)) {
                blocks.push(currentBlock)
                currentBlock = { content: '', styles: arrayWithout(currentBlock.styles, endMark.style) }
            
                lastCharType = 'mark'
                return
            }
        }

        currentBlock.content += char
        lastCharType = 'content'
    })

    blocks.push(currentBlock)

    if (currentBlock.styles.length !== 0) {
        currentBlock.styles.forEach(style => {
            let foundStart = false

            blocks.reverse().forEach(block => {
                if (foundStart) {
                    return
                }

                if (block.styles.includes(style)) {
                    block.styles = arrayWithout(block.styles, style)
                }
                if (!block.styles.includes(style) || currentBlock.styles.length === 1) {
                    foundStart = true
                    block.content = getMarkFromStyle(style).start + block.content
                }
            })
            blocks.reverse()
        })
    }

    return mergeBlocks(removeEmptyBlocks(blocks))
}
