import * as React from 'react'

export interface OwnedItemObject {
    type: 'OWNED_ITEM',
    name: string
}

const OwnedItem = (
    props: {
        item: OwnedItemObject
    }
) => {


    return (
        <div>
            {props.item.name}
        </div>
    )
}

export default OwnedItem
