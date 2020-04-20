import { formatter } from './formatter'

test("", () => {
    expect(formatter("rampa *pampa*")).toStrictEqual([
        {
            text: "rampa ",
            modifiers: []
        },
        {
            text: "pampa",
            modifiers: ["bold"]
        }
    ])
})
