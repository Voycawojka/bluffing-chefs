import * as React from 'react'
import { UnknownClaimedItem } from '../../shared/model/item'

const UnknownClaimedItem = (
    props: {
        item: UnknownClaimedItem
    }
) => {


    return (
        <div className="items__item">
            claimed as : {props.item.claimedAs}
        </div>
    )
}

export default UnknownClaimedItem
