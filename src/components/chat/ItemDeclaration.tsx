import * as React from 'react'
import DisplayedImage from "./DisplayedImage"

export interface  ItemDeclarationObject {
    type: 'ITEM_DECLARATION'
    user: string,
    time: number,
    item: string
}

const ItemDeclaration = (
    props: {
        message: ItemDeclarationObject
    } 
) => {
    return (
        <div>{props.message.user} claims to have <DisplayedImage name={props.message.item}/></div>
    )
}

export default ItemDeclaration
