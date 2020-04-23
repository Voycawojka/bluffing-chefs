import * as React from 'react'
import { KnownItem } from '../../shared/model/item'

const KnownItem = (
    props: {
        item: KnownItem
    }
) => {


    return (
        <div>
            {props.item.name}
        </div>
    )
}

export default KnownItem
