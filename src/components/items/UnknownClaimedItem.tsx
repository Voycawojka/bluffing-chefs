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
                    const opponent = gameContext.opponents.find(opponent => opponent.items.find(item => item === props.item))

                    if (opponent) {
                        const playerItemIndex = gameContext.items.indexOf(item)
                        const opponentItemIndex = opponent.items.indexOf(props.item)
    
                        api.makeOffer(opponent.name, playerItemIndex, opponentItemIndex)
                            .then(succesOffer => gameContext.setOffers(offers => [...offers, succesOffer.offerData]))
                    } else {
                        throw 'opponent is unknown'
                    }
                }}
            >{item.name}</p>
        )

    return (
        <div className="items__item">
            <p className='items__item-label'>{props.item.claimedAs}</p>
            {/* TODO image */}
            <img className='items__item-image' src='' />
            <img className='items__item-question-mark' src=''/>
            <button  
                className='items__item-exchange'
                onClick={() => setPossibleOffersVisible(state => !state)}
            >
            exchange    
            </button>
            {possibleOffersVisible && renderMyClaims}
        </div>
    )
}

export default UnknownClaimedItem
