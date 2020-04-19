import * as React from 'react'
import { useEffect, useState } from 'react'
import { useInputChange } from '../../hooks/useInputChange'
import { stringInRange } from '../../utils/constraintUtils'
import Message, { MessageType } from './Message'

const Chat = () => {
    const [message, setMessage, resetMessage] = useInputChange(100)
    const [conversation, setConversation] = useState<MessageType[]>([
        // hardcoded messages
        {
            type: 'ITEM_DECLARATION',
            user: 'Megawonsz9',
            item: 'pomidor',
            time: 42
        },
        {
            type: 'ITEM_DECLARATION',
            user: 'Filipesq',
            item: 'the game',
            time: 999
        },
        {
            type: 'USER_MESSAGE',
            user: 'Filipesq',
            content: 'Lubię placki',
            time: 98
        },
        {
            type: 'TRANSACTION',
            user1: 'Czesiek z Łynczycy',
            user2: 'Staszek Alcatraz',
            item1: 'Polish remover',
            item2: 'Potato of death',
            time: 22
        }
    ])


    useEffect(() => {
        // function subscribing conversation 
    }, [])

    function submitMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submiting message

        resetMessage()
    }

    const renderConversation = conversation.map(message => 
        <Message message={message}/>
    )

    return (
       <div className='chat'>
           <div className='chat__conversation'>
                {renderConversation}
           </div>
            <form onSubmit={submitMessage}>
                <input
                    type='text'
                    value={message}
                    onChange={setMessage}
                />
                <input
                    type='submit'
                    value='submit'
                    disabled={!stringInRange(message, 1, 100)}
                />
            </form>     
       </div>
    )
}

export default Chat
