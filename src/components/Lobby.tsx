import * as React from 'react'
import { useEffect, useState } from 'react'
import * as api from '../client/api'

const Lobby = (

) => {
    const [ playerAmount, setPlayerAmount ] = useState(0) 

    useEffect(() => {
        const unsubscribe = api.subscribeForRandomQueueSize(amount => setPlayerAmount(amount))
        return unsubscribe
    }, [])

    return (
        <div className='lobby'>
            <p>Waiting for players: {playerAmount}/4</p>
        </div>
    )
}

export default Lobby
