import * as React from 'react'
import HiddenItem, { HiddenItemObject } from './HiddenItem'
import ClaimedItem, { ClaimedItemObject } from './ClaimedItem'
import OwnedItem, { OwnedItemObject } from './OwnedItem'
import KnownItem, { KnownItemObject } from './KnownItem'

export type ItemObject = HiddenItemObject | ClaimedItemObject | OwnedItemObject | KnownItemObject

const Item = (
    props: {
        item: ItemObject
    }
) => {

    const content = (() => {
        switch(props.item.type) {
            case 'HIDDEN_ITEM': 
                return <HiddenItem item={props.item} />
            case 'CLAIMED_ITEM':
                return <ClaimedItem item={props.item}/>
            case 'OWNED_ITEM':
                return <OwnedItem item={props.item}/>
            case 'KNOWN_ITEM':
                return <KnownItem item={props.item}/>
            default: return null
        }
    })()

    return (
        <>
            {content}
        </>
    )
}

export default Item
