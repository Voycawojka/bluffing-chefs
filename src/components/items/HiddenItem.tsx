import * as React from 'react'

export interface HiddenItemObject {
    type: 'HIDDEN_ITEM'
}

const HiddenItem = (
    props: {
        item: HiddenItemObject
    }
) => {


    return (
        <div>
            ?
        </div>
    )
}

export default HiddenItem
