import * as React from 'react'
import LandingPage from './landingPage/LandingPage'
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
