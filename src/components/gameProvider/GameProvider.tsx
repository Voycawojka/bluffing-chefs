import React, { useState } from 'react'
import { StartingData } from '../../shared/model/game'
import { PlayersItem, OpponentsItem, UnknownClaimedItem } from '../../shared/model/item'
import { ItemDeclaration, Transaction } from '../../shared/model/message'
import { Offer, AcceptOfferSuccessResponse } from '../../shared/model/game'

export interface Opponent {
    name: string,
    items: OpponentsItem[]
}

export interface GameData {
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
    deleteOffer: (id: string) => void
    handleTransactionsFromPersonalOffers: (offerResponse: AcceptOfferSuccessResponse, offersObject: Offer[]) => void,
    resetGameData: () => void
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
                .map(player => ({
                    name: player,
                    items: Array(5).fill({ type: 'unknown-item' })
                }))
        )
    }

    const handleOpponentDeclaration = (declaration: ItemDeclaration) => {
        const index = declaration.item.index

        const opponentIndex = opponents.findIndex(opponent => opponent.name === declaration.user) 
            
        setOpponents(data => {
            const clonedData = [...data]

            clonedData[opponentIndex].items[index] = ({
                type: 'unknown-claimed-item',
                claimedAs: declaration.item.claimedAs
            })
            return clonedData
        })
    }

    const handleOwnDeclaration = (declaration: ItemDeclaration) => {
        const index = declaration.item.index

        setItems(data => {
            const clonedData = [...data]

            clonedData[index] = ({
                type: 'known-claimed-item',
                claimedAs: declaration.item.claimedAs,
                name: data[index].name
            })
            return clonedData
        }) 
    }

    //handles both player and opponent declarations
    const handleDeclarationFromMessage = (declaration: ItemDeclaration) => { 
        const isOpponent = declaration.user !== userName

        if (isOpponent) {
            handleOpponentDeclaration(declaration)
        } else {
            handleOwnDeclaration(declaration)
        }
    }

    const deleteOffer = (id: string) => {
        setOffers(offers => {
            const clonedOffers = [...offers]

            clonedOffers.splice(clonedOffers.findIndex(offer => offer.id === id), 1)
            return clonedOffers
        })  
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

                setOpponents(opponents => {
                    const clonedOpponents = [...opponents]

                    clonedOpponents[opponentIndex].items[trader.item.index] = { type: 'unknown-item' }
                    return clonedOpponents
                })
            })
        }

        setOffers(offers => offers.filter(offer => {
            const isGivenItemFromUser1 = offer.from === transaction.user1.name && offer.offeredItemIndex === transaction.user1.item.index
            const isGivenItemFromUser2 = offer.from === transaction.user2.name && offer.offeredItemIndex === transaction.user2.item.index
            const isReceivedItemToUser1 = offer.to === transaction.user1.name && offer.forItemIndex === transaction.user1.item.index
            const isReceivedItemToUser2 = offer.to === transaction.user2.name && offer.forItemIndex === transaction.user2.item.index

            return !isGivenItemFromUser1 && !isGivenItemFromUser2 && !isReceivedItemToUser1 && !isReceivedItemToUser2
        }))
    }
    
    // handle my transactions
    const handleTransactionsFromPersonalOffers = (offerResponse: AcceptOfferSuccessResponse) => {
        const offer = offers.find(offer => offer.id === offerResponse.id) 
        
        if (offer) {
            const isMyOffer = offer.from === userName
            const myItemIndex = isMyOffer ? offer.offeredItemIndex : offer.forItemIndex
            const opponentItemIndex = isMyOffer ? offer.forItemIndex : offer.offeredItemIndex
    
            setItems(items => {
                const clonedItems = [...items]

                clonedItems[myItemIndex] = offerResponse.gotItem
                return clonedItems
            })
            setOpponents(opponents => {
                const clonedOpponents = [...opponents]
                const enemyIndex = clonedOpponents.findIndex(
                    opponent => opponent.name === (isMyOffer ? offer.to : offer.from)
                )

                clonedOpponents[enemyIndex].items[opponentItemIndex] = {
                    type: 'unknown-item'
                }
                return clonedOpponents
            })
            deleteOffer(offerResponse.id)
        } else {
            throw 'can\'t find offer'
        }

    }

    const resetGameData = () => {
        setItems([])
        setNeededItems([])
        setAllItems([])
        setOpponents([])
        setUserName('')
        setOffers([])
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
            handleTransactionFromMessage,
            deleteOffer,
            handleTransactionsFromPersonalOffers,
            resetGameData
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
