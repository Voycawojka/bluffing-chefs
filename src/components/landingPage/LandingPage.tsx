import * as React from 'react'
import {  useState } from 'react'
import GameEnter from './GameEnter'
import Lobby from './Lobby'
import Author from './Author'

const LandingPage = () => {
    const [inQueue, setInQueue] = useState(false)

    return (
        <div className='landing-page'>
            <img className='landing-page__title' src='./assets/logo.png'></img>
            {inQueue ? <Lobby /> : <GameEnter setInQueue={setInQueue} /> }
            <div className='landing-page__description'>
                <h2 className='landing-page__heading'>How to play</h2>
                <p className='landing-page__description-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                <p className='landing-page__description-content'>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div className='landing-page__about'>
                <h2 className='landing-page__heading'>Check us out</h2>
                
                <div className='landing-page__authors-container'>
                    <Author 
                        name='Filip A. Kowalski'  
                        socialLinks={[
                            {
                                url: 'http://ideasalmanac.com',
                                icon: 'fa fa-globe-africa'
                            },
                            {
                                url: 'https://twitter.com/IdeasAlmanac',
                                icon: 'fab fa-twitter'
                            },
                            {
                                url: 'https://github.com/Voycawojka',
                                icon: 'fab fa-github'
                            }
                        ]} 
                    />
                    <Author 
                        name='Dominik Józefiak'  
                        socialLinks={[
                            {
                                url: 'https://github.com/domlj',
                                icon: 'fab fa-github'
                            }
                        ]} 
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
