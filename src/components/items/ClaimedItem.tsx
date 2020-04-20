import * as React from 'react'

export interface ClaimedItemObject {
    type: 'CLAIMED_ITEM',
    name: string
}

const ClaimedItem = (
    props: {
        item: ClaimedItemObject
    }
) => {


    return (
        <div>
            {props.item.name}?
        </div>
    )
}

export default ClaimedItem
