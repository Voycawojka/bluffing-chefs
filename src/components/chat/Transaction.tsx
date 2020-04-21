import * as React from 'react'
import DisplayedImage from "./DisplayedImage"

export interface TransactionObject {
    type: 'TRANSACTION'
    user1: string,
    user2: string,
    item1: string,
    item2: string,
    time: number
}

const Transaction = (
    props: {
        message: TransactionObject
    } 
) => {
    return (
        <div>{props.message.user1} exchanged <DisplayedImage name={props.message.item1}/> for <DisplayedImage name={props.message.item2}/> with {props.message.user2} </div>
    )
}

export default Transaction
