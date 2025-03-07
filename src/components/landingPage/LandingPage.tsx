import * as React from 'react'
import { useState, useEffect } from 'react'
import GameEnter from './GameEnter'
import Lobby from './Lobby'
import Description from './Description'
import About from './About'
import { registerPageView } from '../../utils/analytics'

const LandingPage = () => {
    const [inQueue, setInQueue] = useState(false)

    useEffect(() => registerPageView('landing page'), [])

    return (
        <div className='landing-page'>
            <h1 className='landing-page__title'>
                <img className='landing-page__title-image' src='./assets/logo.png' alt="Bluffing Chefs"/>
            </h1>
            {inQueue ? <Lobby /> : <GameEnter setInQueue={setInQueue} /> }
            <Description />
            <About />
        </div>
    )
}

export default LandingPage
