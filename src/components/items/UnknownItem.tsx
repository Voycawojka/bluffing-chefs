import * as React from 'react'
import { UnknownItem } from '../../shared/model/item'

const UnknownItem = (
    props: {
        item: UnknownItem
    }
) => {


    return (
        <div className="items__item">
            ?
        </div>
    )
}

export default UnknownItem
