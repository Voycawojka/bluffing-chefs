import * as React from 'react'
import UnknownItem from './UnknownItem'
import KnownClaimedItem from './KnownClaimedItem'
import UnknownClaimedItem from './UnknownClaimedItem'
import KnownItem from './KnownItem'
import { OpponentsItem, PlayersItem } from "../../shared/model/item"

export type ItemObject = OpponentsItem | PlayersItem

const Item = (
    props: {
        item: ItemObject
    }
) => {

    const content = (() => {
        switch(props.item.type) {
            case 'unknown-item': 
                return <UnknownItem item={props.item} />
            case 'known-claimed-item':
                return <KnownClaimedItem item={props.item}/>
            case 'unknown-claimed-item':
                return <UnknownClaimedItem item={props.item}/>
            case 'known-item':
                return <KnownItem item={props.item}/>
        }
    })()

    return (content)
}

export default Item
