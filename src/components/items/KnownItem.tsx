import * as React from 'react'

export interface KnownItemObject {
    type: 'KNOWN_ITEM',
    name: string
}

const KnownItem = (
    props: {
        item: KnownItemObject
    }
) => {


    return (
        <div>
            {props.item.name}
        </div>
    )
}

export default KnownItem
