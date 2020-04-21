import * as React from 'react'
import FormattedMessage from './FormattedMessage'

export interface UserMessageObject {
    type: 'USER_MESSAGE'
    user: string,
    time: number,
    content: string
}

const UserMessage = (
    props: {
        message: UserMessageObject
    } 
) => {
    return (
        <div>{props.message.user}: <FormattedMessage msg={props.message.content}/> </div>
    )
}

export default UserMessage
