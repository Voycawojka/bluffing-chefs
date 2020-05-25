import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useInputChange } from '../../hooks/useInputChange'
import { stringInRange } from '../../shared/utils/constraintUtils'
import { MessageType } from '../../shared/model/message'
import Message from './Message'
import * as api from '../../client/api'

const Chat = (props: { firstPrompt: MessageType }) => {
    const [message, setMessage, resetMessage] = useInputChange(100, '')
    const [conversation, setConversation] = useState([props.firstPrompt])
    const [keyVisibility, setKeyVisibility] = useState(true)
    const conversationRef = useRef<HTMLDivElement>(null)

    function scrollToBottom() {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight
        }
    }

    function toggleKeyVisibility(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        setKeyVisibility(visibility => !visibility)
    }

    useEffect(() => {
        const unsubMessage = api.subscribeForChatMessage(message => {
            setConversation(conversation => [...conversation, message])
            scrollToBottom()
        })

        return () => unsubMessage()
    }, [])

    useEffect(() => {
        if (window.matchMedia('(min-width: 652px)').matches) {
            setKeyVisibility(false)
        }
    }, [])
    
    function submitMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        api.sendMessage(message)

        resetMessage()
    }

    const renderConversation = conversation.map((message, index) => 
        <Message message={message} key={index} />
    )

    return (
        <div className='chat'>
            <div className='chat__conversation' ref={conversationRef}>
                {renderConversation}
            </div>
            <form className='chat__form' onSubmit={submitMessage}>
                <input
                    className='chat__input'
                    type='text'
                    value={message}
                    placeholder='Make deals!'
                    onChange={setMessage}
                />
                <button 
                    onClick={event => toggleKeyVisibility(event)} 
                    className={`chat__key-toggle`}
                    type="button"
                >
                    <i className="fas fa-info"></i>
                </button>
                <button
                    className='chat__submit'
                    type='submit'
                    disabled={!stringInRange(message, 1, 100)}
                >
                    <i className="fas fa-paper-plane"></i>
                </button>

            </form>
            <div className={`chat__key ${keyVisibility ? 'chat__key--tooltip' : ''}`}>
                <span>*bold*</span>
                <span>_italic_</span>
                <span>~striked~</span>
                <span>[ingredient]</span>
            </div>     
        </div>
    )
}

export default Chat
