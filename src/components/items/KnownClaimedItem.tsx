import * as React from 'react'
import { KnownClaimedItem } from '../../shared/model/item'

const KnownClaimedItem = (
    props: {
        item: KnownClaimedItem 
    }
) => {

    return (
        <div className='items__item items__item--player-item'>
            <p className='items__item-label'>{props.item.name}</p>
            <img className='items__item-image' src={`./assets/items/${props.item.name}.png`} />
            <div className='items__item-claimed-container'>
                <img className='items__item-claimed-image' src={`./assets/items/${props.item.claimedAs}.png`}/>
                <p className='items__item-claimed-name' >{props.item.claimedAs}</p>
            </div>
        </div>
    )
}

export default KnownClaimedItem
