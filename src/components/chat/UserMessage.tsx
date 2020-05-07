import * as React from 'react'
import FormattedMessage from './FormattedMessage'
import { UserMessage } from '../../shared/model/message'

const UserMessage = (
    props: {
        message: UserMessage
    } 
) => {
    return (
        <>
            <span className='message__message-user'>
                {props.message.user}: 
            </span>
            <FormattedMessage msg={props.message.content}/> 
        </>
    )
}

export default UserMessage
