import * as React from 'react'
import { KnownClaimedItem } from '../../shared/model/item'

// TODO probably want to divide it into two components
const KnownClaimedItem = (
    props: {
        item: KnownClaimedItem 
    }
) => {


    return (
        <div>
            {props.item.name} claimed as {props.item.claimedAs} 
        </div>
    )
}

export default KnownClaimedItem
