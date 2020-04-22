import * as React from 'react'
import { useEffect, useState } from 'react'
import LandingPage from './LandingPage'
import Lobby from './Lobby'
import Chat from "./chat/Chat"

const App = () => {
    const [ entered, setEntered ] = useState(false)

    const renderContent = entered 
    ? <Lobby /> 
    : <LandingPage setEntered={() => setEntered(true)} />

    return (
        <>
        {renderContent}
        </>
    )
}

export default App
