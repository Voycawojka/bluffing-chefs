import * as React from 'react'
import {  useState } from 'react'
import GameEnter from './GameEnter'
import Lobby from './Lobby'
import Description from './Description'
import About from './About'

const LandingPage = () => {
    const [inQueue, setInQueue] = useState(false)

    return (
        <div className='landing-page'>
            <img className='landing-page__title' src='./assets/logo.png'></img>
            {inQueue ? <Lobby /> : <GameEnter setInQueue={setInQueue} /> }
            <Description />
            <About />
        </div>
    )
}

export default LandingPage
