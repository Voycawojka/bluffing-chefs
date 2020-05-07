import * as React from 'react'
import { KnownClaimedItem } from '../../shared/model/item'

const KnownClaimedItem = (
    props: {
        item: KnownClaimedItem 
    }
) => {

    return (
        <div className="items__item">
            <p className='items__item-label'>{props.item.name}</p>
            
            <img className='items__item-image' src='' />
            
            <div className='items__item-claimed-container'>
                {/* TODO image */}
                <img className='items__item-claimed-image' src=''/>
                <p className='items__item-claimed-name' >{props.item.claimedAs}</p>
            </div>
        </div>
    )
}

export default KnownClaimedItem
