import * as React from 'react'
import FormattedMessage from './FormattedMessage'
import { UserMessage } from '../../shared/model/message'

const UserMessage = (
    props: {
        message: UserMessage
    } 
) => {
    return (
        <div>{props.message.user}: <FormattedMessage msg={props.message.content}/> </div>
    )
}

export default UserMessage
