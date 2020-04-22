import * as React from 'react'
import { useEffect, useState } from 'react'
import { useInputChange } from '../../hooks/useInputChange'
import { stringInRange } from '../../shared/utils/constraintUtils'
import { MessageType } from '../../shared/model/message'
import Message from './Message'

const Chat = () => {
    const [message, setMessage, resetMessage] = useInputChange(100)
    const [conversation, setConversation] = useState<MessageType[]>([])

    useEffect(() => {
        // function subscribing conversation 
    }, [])

    function submitMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submiting message

        resetMessage()
    }

    const renderConversation = conversation.map((message, index) => 
        <Message message={message} key={index} />
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
