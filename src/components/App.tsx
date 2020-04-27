import * as React from 'react'
import LandingPage from './LandingPage'
import Lobby from './Lobby'
import AppProvider, { AppContext } from './appProvider/AppProvider'
import Game from './game/Game'
import GameProvider, { GameContext } from './gameProvider/GameProvider'

const App = () => {
    return (
        <AppProvider>
            <GameProvider> 
                <AppContext.Consumer>
                    {
                        context => {
                            switch(context.status) {
                                case 'start': 
                                    return <LandingPage />
                                case 'queued':
                                    return <Lobby /> 
                                case 'in-game':
                                    return <Game />  
                            }
                        }}
                </AppContext.Consumer>
            </GameProvider>
        </AppProvider>
    )
}

export default App
