import * as React from 'react'
import { KnownItem } from '../../shared/model/item'

const KnownItem = (
    props: {
        item: KnownItem
    }
) => {

    return (
        <div className="items__item">
            {props.item.name}
        </div>
    )
}

export default KnownItem
