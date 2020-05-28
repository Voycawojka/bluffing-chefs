import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import config from '../../shared/config'
import { AppContext } from './../appProvider/AppProvider'

const Lobby = (

) => {
    const context = useContext(AppContext)

    const [ playerAmount, setPlayerAmount ] = useState(0)
    const [ waitTime, setWaitTime ] = useState(config.waitTimeForMorePlayers)
    

    useEffect(() => {
        const unsubQueueSize = api.subscribeForRandomQueueSize(amount => setPlayerAmount(amount))
        const unsubGameJoin = api.subscribeForGameJoin(() => context.setStatus('in-game'))
        
        return () => {
            unsubQueueSize()
            unsubGameJoin()
            // leave queue
        }
    }, [])

    useEffect(() => {
        let waitTimeIntervalId: null | number = null

        if (playerAmount >= config.minPlayers && waitTimeIntervalId === null) {
            waitTimeIntervalId = window.setInterval(() => setWaitTime(currentWaitTime => currentWaitTime - 1000), 1000)
        }
        
        if (playerAmount < config.minPlayers && waitTimeIntervalId !== null) {
            window.clearInterval(waitTimeIntervalId)
            waitTimeIntervalId = null
            setWaitTime(config.waitTimeForMorePlayers)
        }

        return () => {
            if (waitTimeIntervalId) {
                window.clearInterval(waitTimeIntervalId)
            }
        }
    }, [playerAmount])

    const renderContent = playerAmount >= config.minPlayers
        ? <>
            <p className='lobby__content-paragraph'>Enough players found.</p> 
            <p className='lobby__content-paragraph'>The game will start in {Math.floor(waitTime / 1000)} seconds</p>
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
