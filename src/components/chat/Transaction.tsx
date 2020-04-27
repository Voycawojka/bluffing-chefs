import * as React from 'react'
import { useContext, useEffect } from 'react'
import DisplayedImage from './DisplayedImage'
import { Transaction } from '../../shared/model/message'
import { GameContext } from '../gameProvider/GameProvider'

const Transaction = (
    props: {
        message: Transaction
    } 
) => {
    const gameContext = useContext(GameContext)

    useEffect(() => {
        gameContext.handleTransactionFromMessage(props.message)
    }, [])

    return (
        <div>{props.message.user1.name} exchanged <DisplayedImage name={props.message.user1.item.claimedAs}/> for <DisplayedImage name={props.message.user2.item.claimedAs}/> with {props.message.user2.name} </div>
    )
}

export default Transaction
