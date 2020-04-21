import * as React from 'react'
import UserMessage, { UserMessageObject } from './UserMessage'
import ItemDeclaration, { ItemDeclarationObject } from './ItemDeclaration'
import Transaction, { TransactionObject } from './Transaction'

export type MessageType = UserMessageObject | ItemDeclarationObject | TransactionObject

const Message = (
    props: {
        message: MessageType
    }
) => {

    const content = (() => {
        switch(props.message.type) {
            case 'USER_MESSAGE': 
                return <UserMessage message={props.message}/>
            case 'ITEM_DECLARATION':
                return <ItemDeclaration message={props.message}/>
            case 'TRANSACTION':
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
