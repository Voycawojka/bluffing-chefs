import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import * as api from '../../client/api'
import { Offer } from '../../shared/model/game'

const OfferTile = (
    props: {
        offer: Offer
    }
) => {


    return (
        <div>
            {props.offer.offeredItemIndex} from {props.offer.from} for {props.offer.forItemIndex} to {props.offer.to}
            <button>Accept</button>
            <button>Reject/Cancel</button>
        </div>
    )
}

export default OfferTile
