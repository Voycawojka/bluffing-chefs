import { parse, Style, arrayWithout } from "./formatter"

test('arrayWithout function works correctly', () => {
    const original = [1, 2, 3, 3, 4]
    const actual = arrayWithout(original, 3)
    const expected = [1, 2, 3, 4]

    expect(actual).not.toBe(original)
    expect(actual).toStrictEqual(expected)
})

test('Formatter returns single block for no formatting', () => {
    const actual = parse("Lorem ipsum")
    const expected = [
        { content: 'Lorem ipsum', styles: [] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatted ignores marks without end', () => {
    const actual = parse('[not formatted')
    const expected = [
        { content: '[not formatted', styles: [] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatter ignores normal use of marks', () => {
    const actual = parse('* not formatted * _ not formatted_ ~not formatted ~ [ not formatted')
    const expected = [
        { content: '* not formatted * _ not formatted_ ~not formatted ~ [ not formatted', styles: [] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatter creates single block for whole text in one style', () => {
    const actualBold = parse('*this is bold*')
    const expectedBold = [
        { content: 'this is bold', styles: [Style.bold] }
    ]

    const actualItem = parse('[mustard]')
    const expectedItem = [
        { content: 'mustard', styles: [Style.itemAsset] }
    ]

    expect(actualBold).toStrictEqual(expectedBold)
    expect(actualItem).toStrictEqual(expectedItem)
})

test('Formatter creates multiple blocks for different styles', () => {
    const actual = parse('Normal *bold* _italic_')
    const expected = [
        { content: 'Normal ', styles: [] },
        { content: 'bold', styles: [Style.bold] },
        { content: ' ', styles: [] },
        { content: 'italic', styles: [Style.italic] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatted blocks can have multiple styles', () => {
    const actual = parse('*_Bold & italic_*')
    const expected = [
        { content: 'Bold & italic', styles: [Style.bold, Style.italic] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatted blocks can be nested', () => {
    const actual = parse('*_Bold & italic_ only bold ~bold & striked~*')
    const expected = [
        { content: 'Bold & italic', styles: [Style.bold, Style.italic] },
        { content: ' only bold ', styles: [Style.bold] },
        { content: 'bold & striked', styles: [Style.bold, Style.strike] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatter correctly creates blocks for mixed order of marks', () => {
    const actual = parse('*_Bold & italic*_')
    const expected = [
        { content: 'Bold & italic', styles: [Style.bold, Style.italic] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatter correctly creates blocks for nested marks in wrong order', () => {
    const actual = parse('*_Bold & italic* only italic_')
    const expected = [
        { content: 'Bold & italic', styles: [Style.bold, Style.italic] },
        { content: ' only italic', styles: [Style.italic] }
    ]

    expect(actual).toStrictEqual(expected)
})

test('Formatted blocks don\'t have the same style multiple times', () => {
    const actual = parse('**lorem ipsum**')
    const expected = [
        { content: '*lorem ipsum', styles: [Style.bold] },
        { content: '*', styles: [] }
    ]

    expect(actual).toStrictEqual(expected)
})
