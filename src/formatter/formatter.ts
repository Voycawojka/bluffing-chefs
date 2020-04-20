interface PostFormatTextChunk {
    text: string,
    modifiers: string[]
}

interface Pattern {
    symbol: string,
    name: string
}

const patterns: Pattern[] = [
    {
        symbol: "*",
        name: "bold"
    },

    {
        symbol: "_",
        name: "italic"
    },
    {
        symbol: "~",
        name: "crossout"
    }
]



export function formatter(text: string): PostFormatTextChunk[] {
    const textArray = text.split("")

    return [

    ]
}