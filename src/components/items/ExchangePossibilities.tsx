import * as React from 'react'
import { useState, useContext } from 'react'
import { GameContext } from '../gameProvider/GameProvider'
import { UnknownClaimedItem, KnownClaimedItem } from '../../shared/model/item'
import * as api from '../../client/api'
import { PlayersItem } from '../../shared/model/item'
import KnownClaimedItemComponent from './KnownClaimedItem'

const ExchangePossibilities = (
    props : {
        unproposedClaims: KnownClaimedItem[],
        toggleDown: () => void,
        item: UnknownClaimedItem
    }
) => {
    const gameContext = useContext(GameContext)

    function handleSelection(item: PlayersItem) {
        const opponent = gameContext.opponents.find(opponent => opponent.items.find(item => item === props.item))

        if (opponent) {
            const playerItemIndex = gameContext.items.indexOf(item)
            const opponentItemIndex = opponent.items.indexOf(props.item)
    
            api.makeOffer(opponent.name, playerItemIndex, opponentItemIndex)
                .then(succesOffer => gameContext.setOffers(offers => [...offers, succesOffer.offerData]))
                .then(() => props.toggleDown())
        } else {
            throw 'opponent is unknown'
        }
    }

    const renderPossibilities = props.unproposedClaims.map(item => 
        <div
            className='exchange-possibilites__possibility'
            onClick={() => handleSelection(item)}
        >
            <KnownClaimedItemComponent item={item}/>
        </div>
    )

    return (
        <div className='exchange-possibilites'>
            <div className='exchange-possibilites__content'>
                <p className='exchange-possibilites__heading'>Offer for</p>
                <div className='exchange-possibilites__container'>
                    {renderPossibilities}
                </div>
                <button className='exchange-possibilites__exit' onClick={props.toggleDown}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    )
}

export default ExchangePossibilities
