import * as React from 'react'
import { useContext, useRef } from 'react'
import * as api from '../../client/api'
import { Offer } from '../../shared/model/game'
import { GameContext } from '../gameProvider/GameProvider'
import { KnownClaimedItem } from '../../shared/model/item'
import { UnknownClaimedItem }from '../../shared/model/item'

const OfferTile = (
    props: {
        offer: Offer
    }
) => {

    const gameContext = useContext(GameContext)
    const offersRef = useRef(gameContext.offers)
    const isMyOffer = gameContext.userName === props.offer.from

    function acceptOffer() {
        api.acceptOffer(props.offer.id)
            .then(data => gameContext.handleTransactionsFromPersonalOffers(data, offersRef.current))
    }

    function denyOffer() {
        const id = props.offer.id

        if (isMyOffer) {
            api.cancelOffer(id)
                .then(() => gameContext.deleteOffer(id))
        } else {
            api.rejectOffer(id)
                .then(() => gameContext.deleteOffer(id))
        }
        
    }

    const renderOwner = isMyOffer
        ? `to ${props.offer.to}`
        : `from ${props.offer.from}`

    const getClaimedItemNames = (() => {
        let offeredItem: KnownClaimedItem | UnknownClaimedItem
        let forItem: KnownClaimedItem | UnknownClaimedItem

        if (isMyOffer) {
            offeredItem = gameContext.items[props.offer.offeredItemIndex] as KnownClaimedItem
            forItem = gameContext.opponents.find(opponent => opponent.name)?.items[props.offer.forItemIndex] as UnknownClaimedItem
        } else {
            offeredItem = gameContext.opponents.find(opponent => opponent.name)?.items[props.offer.offeredItemIndex] as UnknownClaimedItem
            forItem = gameContext.items[props.offer.forItemIndex] as KnownClaimedItem
        }

        return [offeredItem.claimedAs, forItem.claimedAs]
    })()

    const renderButtons = isMyOffer 
        ? <button className='offers__offer-tile-button offers__offer-tile-button--cancel' onClick={denyOffer}>cancel</button>
        : <>
            <button className='offers__offer-tile-button offers__offer-tile-button--left' onClick={acceptOffer}>deal</button>
            <button className='offers__offer-tile-button offers__offer-tile-button--right' onClick={denyOffer}>no</button>
        </>

    return (
        <div className='offers__offer-tile'>
            <p className='offers__offer-tile-owner'>{renderOwner}</p>
            <div className='offers__offer-content'>
                <p className='items__item-label'>{getClaimedItemNames[0]} for {getClaimedItemNames[1]}</p>
                <div className='offers__offer-tile-image-container'>
                    {/* image from */}
                    <img className='offers__offer-tile-image' src={`./assets/items/${getClaimedItemNames[0]}.png`}/>
                    {/* image to */}
                    <img className='offers__offer-tile-image' src={`./assets/items/${getClaimedItemNames[1]}.png`}/>
                </div>
                {renderButtons}
            </div>
        </div>
    )
}

export default OfferTile
