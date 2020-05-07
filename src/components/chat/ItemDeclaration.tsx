import * as React from 'react'
import { useEffect, useContext } from 'react'
import DisplayedImage from './DisplayedImage'
import { ItemDeclaration } from '../../shared/model/message'
import { GameContext } from '../gameProvider/GameProvider'

const ItemDeclaration = (
    props: {
        message: ItemDeclaration
    } 
) => {
    const gameContext = useContext(GameContext)

    useEffect(() => {
        gameContext.handleDeclarationFromMessage(props.message)
    }, [])

    return (
        <div className='message__special'>
            {props.message.user} claims to have <DisplayedImage name={props.message.item.claimedAs}/>
        </div>
    )
}

export default ItemDeclaration
