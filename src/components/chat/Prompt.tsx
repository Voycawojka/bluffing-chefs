import * as React from 'react'
import FormattedMessage from './FormattedMessage'
import { Prompt } from '../../shared/model/message'

const Prompt = (
    props: {
        message: Prompt
    } 
) => {
    return (
        <div className='message__special'>
            <FormattedMessage msg={props.message.content}/> 
        </div>
    )
}

export default Prompt
