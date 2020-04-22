import * as React from 'react'
import DisplayedImage from "./DisplayedImage"
import { Transaction } from '../../shared/model/message'

const Transaction = (
    props: {
        message: Transaction
    } 
) => {
    return (
        <div>{props.message.user1} exchanged <DisplayedImage name={props.message.user1.item}/> for <DisplayedImage name={props.message.user2.item}/> with {props.message.user2} </div>
    )
}

export default Transaction
