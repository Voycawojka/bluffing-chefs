import React, { useState, useEffect } from 'react'
import { StartingData } from '../../shared/model/game'
import { PlayersItem, OpponentsItem, UnknownClaimedItem } from '../../shared/model/item'
import { ItemDeclaration, Transaction } from '../../shared/model/message'
import { Offer } from '../../shared/model/game'

export interface Opponent {
    name: string,
    items: OpponentsItem[]
}

interface GameData {
    items: PlayersItem[]
    neededItems: string[]
    allItems: string[]
    opponents: Opponent[]
    userName: string
    offers: Offer[]
    setInitialData: (data: StartingData) => void
    handleDeclarationFromMessage: (declaration: ItemDeclaration) => void
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setOffers: React.Dispatch<React.SetStateAction<Offer[]>>
    handleTransactionFromMessage: (transaction: Transaction) =>  void
}

export const GameContext = React.createContext<GameData>({} as GameData)

const GameProvider = (
    props: {
        children: React.ReactNode
    }
) => {
    const [items, setItems] = useState<PlayersItem[]>([])
    const [neededItems, setNeededItems] = useState<string[]>([])
    const [allItems, setAllItems] = useState<string[]>([])
    const [opponents, setOpponents] = useState<Opponent[]>([])
    const [userName, setUserName] = useState<string>('')
    const [offers, setOffers] = useState<Offer[]>([])

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

    //handles both player and opponent declarations
    const handleDeclarationFromMessage = (declaration: ItemDeclaration) => { 
        const index = declaration.item.index

        if (declaration.user !== userName) {
            const opponent = opponents.find(opponent => opponent.name === declaration.user)
            const opponentIndex = opponents.indexOf(opponent as Opponent)

            setOpponents(data => {
                data[opponentIndex].items[index] = ({
                    type: 'unknown-claimed-item',
                    claimedAs: declaration.item.claimedAs
                })
                return [...data]
            })
        } else {
            setItems(data => {
                data[index] = ({
                    type: 'known-claimed-item',
                    claimedAs: declaration.item.claimedAs,
                    name: data[index].name
                })
                return [...data]
            }) 
        }
    }

    //handles opponent transactions from message
    const handleTransactionFromMessage = (transaction: Transaction) => {
        const isPlayerTrader1 = transaction.user1.name === userName
        const isPlayerTrader2 = transaction.user2.name === userName
        const isPlayerTrading = isPlayerTrader1 || isPlayerTrader2

        if (!isPlayerTrading) {
            const traders = [transaction.user1, transaction.user2]

            traders.forEach(trader => {
                const opponent = opponents.find(opponent => opponent.name === trader.name)
                const opponentIndex = opponents.indexOf(opponent as Opponent)

                setOpponents(data => {
                    data[opponentIndex].items[trader.item.index] = { type: 'unknown-item' }
                    return [...data]
                })
            })
        }
    }
    
    return (
        <GameContext.Provider value={{
            items,
            neededItems,
            allItems,
            opponents,
            userName,
            offers,
            setOffers,
            setInitialData,
            handleDeclarationFromMessage,
            setUserName,
            handleTransactionFromMessage
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
