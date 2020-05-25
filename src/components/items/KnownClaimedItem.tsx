import * as React from 'react'
import { KnownClaimedItem } from '../../shared/model/item'

const KnownClaimedItem = (
    props: {
        item: KnownClaimedItem 
    }
) => {

    return (
        <div className='items__item items__item--resizeable'>
            <p className='items__item-label items__item-label--resizeable'>{props.item.name}</p>
            <img className='items__item-image items__item-image--resizeable' src={`./assets/items/${props.item.name}.png`} />
            <div className='items__item-claimed-container items__item-claimed-container--resizeable'>
                <img className='items__item-claimed-image items__item-claimed-image--resizeable' src={`./assets/items/${props.item.claimedAs}.png`}/>
                <p className='items__item-claimed-name items__item-claimed-name--resizeable' >{props.item.claimedAs}</p>
            </div>
        </div>
    )
}

export default KnownClaimedItem
