import * as React from 'react'
import { useContext, useState } from 'react'
import { UnknownClaimedItem } from '../../shared/model/item'
import * as api from '../../client/api'
import { GameContext, Opponent } from '../gameProvider/GameProvider'


const UnknownClaimedItem = (
    props: {
        item: UnknownClaimedItem
    }
) => {
    const [possibleOffersVisible, setPossibleOffersVisible] = useState(false)
    const gameContext = useContext(GameContext)

    const renderMyClaims = gameContext.items
        .filter(item => item.type === 'known-claimed-item')
        .filter(item =>
            !gameContext.offers.find(offer => offer.offeredItemIndex === gameContext.items.indexOf(item)))
        .map(item => 
            <p
                onClick={() => {
                    const opponent = gameContext.opponents.find(opponent => opponent.items.find(item => item === props.item)) as Opponent
                    const playerItemIndex = gameContext.items.indexOf(item)
                    const opponentItemIndex = opponent.items.indexOf(props.item)

                    api.makeOffer(opponent.name, playerItemIndex, opponentItemIndex)
                        .then(succesOffer => gameContext.setOffers(offers => [...offers, succesOffer.offerData]))
                }}
            >{item.name}</p>
        )

    return (
        <div className='items__item'>
            claimed as : {props.item.claimedAs}
            <button onClick={() => setPossibleOffersVisible(state => !state) }>offer for</button>
            {possibleOffersVisible && renderMyClaims}
        </div>
    )
}

export default UnknownClaimedItem
