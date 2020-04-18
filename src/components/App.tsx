import * as React from 'react'
import { useEffect, useState } from 'react'
import * as api from '../firebase/api'
import LandingPage from './LandingPage'
import Lobby from './Lobby'

const App = () => {
    const [ playerAmount, setplayerAmount ] = useState<number>(0) 
    const [ entered, setEntered ] = useState<boolean>(false)

    useEffect(() => {
        api.subscribeForRandomQueueSize(n => setplayerAmount(n))
    }, [])

    const renderContent = entered 
    ? <Lobby playerAmount={playerAmount}/> 
    : <LandingPage setEntered={() => setEntered(true)} />

    return (
        <>
        {renderContent}
        </>
    )
}

export default App
