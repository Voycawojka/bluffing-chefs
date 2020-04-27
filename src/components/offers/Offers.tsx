import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import * as api from '../../client/api'
import { Offer } from '../../shared/model/game'
import OfferTile  from './OfferTile'
import { GameContext } from '../gameProvider/GameProvider'

const Offers = () => {
    const gameContext = useContext(GameContext)
    
    useEffect(() => {
        api.subscribeForOffers(
            offer => {
                gameContext.setOffers(data => [...data, offer])
            }
        )
    }, [])

    useEffect(() => {
        api.subscribeForRejectedOffers(
            rejectedOffer => {
                //todo
            }
        )
    }, [])

    const renderOffers = gameContext.offers.map(offer => <OfferTile offer={offer} key={offer.id} />)

    return (
        <div>
            CurrentOffers:
            {renderOffers}
        </div>
    )
}

export default Offers
