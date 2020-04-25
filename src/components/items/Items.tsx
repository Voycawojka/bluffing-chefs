import * as React from 'react'
import Item, { ItemObject } from './Item'

const Items = (
    props: {
        items: ItemObject[]
    }
) => {

    const renderItems = props.items.map((item, index) =>
        <Item item={item} key={index} />
    )

    return (
        <>
            {renderItems}
        </>
    )
}

export default Items
