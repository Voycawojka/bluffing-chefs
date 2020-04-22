import * as React from 'react'
import DisplayedImage from "./DisplayedImage"
import { ItemDeclaration } from '../../shared/model/message'

const ItemDeclaration = (
    props: {
        message: ItemDeclaration
    } 
) => {
    return (
        <div>{props.message.user} claims to have <DisplayedImage name={props.message.item}/></div>
    )
}

export default ItemDeclaration
