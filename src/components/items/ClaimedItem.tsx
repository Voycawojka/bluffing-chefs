import * as React from 'react'
import { KnownClaimedItem, UnknownClaimedItem } from '../../shared/model/item'

// TODO probably want to divide it into two components
const ClaimedItem = (
    props: {
        item: KnownClaimedItem | UnknownClaimedItem
    }
) => {


    return (
        <div>
            {props.item.claimedAs}
            {props.item.type === 'known-claimed-item' ? `(${props.item.name} for real)` : '?'}
        </div>
    )
}

export default ClaimedItem
