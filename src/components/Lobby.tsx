import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../client/api'
import config from '../shared/config'
import { AppContext } from './appProvider/AppProvider'

const Lobby = (

) => {
    const context = useContext(AppContext)

    const [ playerAmount, setPlayerAmount ] = useState(0) 

    useEffect(() => {
        const unsubQueueSize = api.subscribeForRandomQueueSize(amount => setPlayerAmount(amount))
        const unsubGameJoin = api.subscribeForGameJoin(() => context.setStatus('in-game'))
        
        return () => {
            unsubQueueSize()
            unsubGameJoin()
            // leave queue
        }
    }, [])

    return (
        <div className='lobby'>
            <p>Players in the queue: {playerAmount}</p>
            {playerAmount >= config.minPlayers
                ? <p>Enough players found. The game will start in {Math.floor(config.waitTimeForMorePlayers / 1000)} seconds</p> // TODO <- this should be an actual counter
                : <p>Waiting for at least {config.minPlayers} players to start</p>
            }
            
        </div>
    )
}

export default Lobby
