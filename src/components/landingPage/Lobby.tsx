import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import config from '../../shared/config'
import { AppContext } from './../appProvider/AppProvider'

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

    const renderContent = playerAmount >= config.minPlayers
        ? <>
            <p className='lobby__content-paragraph'>Enough players found.</p> 
            <p className='lobby__content-paragraph'>The game will start in {Math.floor(config.waitTimeForMorePlayers / 1000)} seconds</p>
        </>
        : <>
            <p className='lobby__content-paragraph'>Found: {playerAmount} </p>
            <p className='lobby__content-paragraph'>Waiting for at least {config.minPlayers}</p>
        </>

    return (
        <div className='lobby'>
            <h2 className='landing-page__heading'>Looking for players...</h2>
            <div className='lobby__content-container'>
                <img className='lobby__hourglass' src='./assets/hourglass.png'></img>
                <div className='lobby__content'>
                    {renderContent}
                </div>
            </div>
            
        </div>
    )
}

export default Lobby
