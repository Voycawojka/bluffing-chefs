import * as React from 'react'
import { useContext, useEffect, useRef } from 'react'
import * as api from '../../client/api'
import { Offer } from '../../shared/model/game'
import { GameContext } from '../gameProvider/GameProvider'

const OfferTile = (
    props: {
        offer: Offer
    }
) => {

    const gameContext = useContext(GameContext)
    const offersRef = useRef(gameContext.offers)
    const isItMyOffer = gameContext.userName === props.offer.from

    function acceptOffer() {
        api.acceptOffer(props.offer.id)
            .then(data => gameContext.handleTransactionsFromPersonalOffers(data, offersRef.current))
    }

    function denyOffer() {
        const id = props.offer.id

        if (isItMyOffer) {
            api.cancelOffer(id)
                .then(() => gameContext.deleteOffer(id))
        } else {
            api.rejectOffer(id)
                .then(() => gameContext.deleteOffer(id))
        }
        
    }

    return (
        <div>
            {props.offer.offeredItemIndex} from {props.offer.from} for {props.offer.forItemIndex} to {props.offer.to}
            <button onClick={acceptOffer} disabled={isItMyOffer}>Accept</button>
            <button onClick={denyOffer}>{ isItMyOffer ? 'Cancel' : 'Reject' }</button>
        </div>
    )
}

export default OfferTile
