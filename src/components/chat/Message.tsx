import * as React from 'react'
import { MessageType } from '../../shared/model/message'
import UserMessage from './UserMessage'
import ItemDeclaration from './ItemDeclaration'
import Transaction from './Transaction'

const Message = (
    props: {
        message: MessageType
    }
) => {

    const content = (() => {
        switch(props.message.type) {
            case 'user-message': 
                return <UserMessage message={props.message}/>
            case 'item-declaration':
                return <ItemDeclaration message={props.message}/>
            case 'transaction':
                return <Transaction message={props.message}/>
        }
    })()

    return (
        <div className='message'>
            {content}
        </div>
    )
}

export default Message
