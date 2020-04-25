import * as React from 'react'
import DisplayedImage from "./DisplayedImage"
import { Transaction } from '../../shared/model/message'

const Transaction = (
    props: {
        message: Transaction
    } 
) => {
    return (
        <div>{props.message.user1.name} exchanged <DisplayedImage name={props.message.user1.item.claimedAs}/> for <DisplayedImage name={props.message.user2.item.claimedAs}/> with {props.message.user2.name} </div>
    )
}

export default Transaction
