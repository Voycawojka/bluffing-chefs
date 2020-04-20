import * as React from 'react'
import { useEffect, useState } from 'react'
import * as api from '../client/api'
import config from '../shared/config'

const Lobby = (

) => {
    const [ playerAmount, setPlayerAmount ] = useState(0) 

    useEffect(() => {
        const unsubscribe = api.subscribeForRandomQueueSize(amount => setPlayerAmount(amount))
        return unsubscribe
    }, [])

    return (
        <div className='lobby'>
            <p>Waiting for players: {playerAmount}/{config.minPlayers}</p>
        </div>
    )
}

export default Lobby
