import * as React from 'react'
import { Component } from 'react'
import * as api from '../../client/api'
import OfferTile  from './OfferTile'
import { GameContext, GameData } from '../gameProvider/GameProvider'
import { UnsubscribeFn } from '../../client/subscribe'


class Offers extends Component<{}, {}> {
    static contextType: React.Context<GameData> = GameContext

    private subscribtionHandles: UnsubscribeFn[]

    componentDidMount() {
        this.subscribtionHandles = [
            api.subscribeForOffers(offer => this.context.setOffers(data => [...data, offer])),
            api.subscribeForRejectedOffers(rejectedOffer => this.context.deleteOffer(rejectedOffer.id)),
            api.subscribeForCancelledOffers(canceledOffer => this.context.deleteOffer(canceledOffer.id)),
            api.subscribeForAcceptedOffers(acceptedOffer => this.context.handleTransactionsFromPersonalOffers(acceptedOffer))
        ]  
    }

    componentWillUnmount() {
        this.subscribtionHandles.forEach(subscribtion => subscribtion())
    }
    

    render() {
        const renderOffers = this.context.offers.map(offer => <OfferTile offer={offer} key={offer.id} />)
    
        return (
            <div>
            CurrentOffers:
                {renderOffers}
            </div>
        )
    }
}

export default Offers
