import React, { useState } from 'react'
import { StartingData } from '../../shared/model/game'
import { PlayersItem, OpponentsItem, UnknownClaimedItem } from '../../shared/model/item'
import { ItemDeclaration } from '../../shared/model/message'

interface Opponent {
    name: string,
    items: OpponentsItem[]
}

interface GameData {
    items: PlayersItem[]
    neededItems: string[]
    allItems: string[]
    opponents: Opponent[]
    userName: string
}

export const AppContext = React.createContext<GameData>({} as GameData)

const GameProvider = (
    props: {
        children: React.ReactNode
    }
) => {
    const [items, setItems] = useState<PlayersItem[]>([])
    const [neededItems, setNeededItems] = useState<string[]>([])
    const [allItems, setAllItems] = useState<string[]>([])
    const [opponents, setOpponents] = useState<Opponent[]>([])
    const [userName, setUserName] = useState<string>("")

    const setInitialData = (data: StartingData) => {
        setItems(data.items)
        setNeededItems(data.neededItems)
        setAllItems(data.allItems)
        setOpponents(
            data.players
                .filter(player => userName !== player)
                .map(player => { 
                    return ({
                        name: player,
                        items: Array(5).fill({ type: 'unknown-item' })
                })
            })
        )
    }

    const setDeclarationFromMessage = (declaration: ItemDeclaration) => {        
        if (declaration.user !== userName) {
            const opponent = opponents.find(opponent => opponent.name === declaration.user)
            const index = opponents.indexOf(opponent as Opponent)

            setOpponents(data => {
                data[index].items.pop()
                data[index].items.push({
                    type: 'unknown-claimed-item',
                    claimedAs: declaration.item.claimedAs
                })
                return data
            })
        }
    }

    const setDeclarationFromUser = () => {
        
    }
    
    return (
        <AppContext.Provider value={{
            items,
            neededItems,
            allItems,
            opponents,
            userName
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default GameProvider
