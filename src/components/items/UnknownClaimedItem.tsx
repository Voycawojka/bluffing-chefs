import * as React from 'react'
import { useContext, useState } from 'react'
import * as api from '../../client/api'
import { GameContext, Opponent } from '../gameProvider/GameProvider'
import ExchangePossibilities from './ExchangePossibilities'
import { UnknownClaimedItem, KnownClaimedItem } from '../../shared/model/item'

const UnknownClaimedItem = (
    props: {
        item: UnknownClaimedItem
    }
) => {
    const [possibleOffersVisible, setPossibleOffersVisible] = useState(false)
    const gameContext = useContext(GameContext)

    const unproposedClaims = gameContext.items
        .filter(item => item.type === 'known-claimed-item') 
        .filter(item =>
            !gameContext.offers.find(offer => offer.offeredItemIndex === gameContext.items.indexOf(item))
        ) as KnownClaimedItem[]

    return (
        <div className="items__item">
            <p className='items__item-label'>{props.item.claimedAs}</p>
            <img className='items__item-image' src={`./assets/items/${props.item.claimedAs}.png`} />
            {/* TODO question mark image */}
            <img className='items__item-question-mark' src=''/>
            <button  
                className='items__item-button'
                onClick={() => setPossibleOffersVisible(true)}
                disabled={unproposedClaims.length === 0}
            >
            exchange    
            </button>
            
            {
                possibleOffersVisible && <ExchangePossibilities 
                    unproposedClaims={unproposedClaims} 
                    toggleDown={() => setPossibleOffersVisible(false)}
                    item={props.item}
                />
            }
        </div>
    )
}

export default UnknownClaimedItem
