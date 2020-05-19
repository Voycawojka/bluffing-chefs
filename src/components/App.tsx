import * as React from 'react'
import LandingPage from './landingPage/LandingPage'
import AppProvider, { AppContext } from './appProvider/AppProvider'
import Game from './game/Game'
import Privacy from './privacy/Privacy'
import GameProvider from './gameProvider/GameProvider'
import CookiePopup from './landingPage/CookiePopup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Route path='/privacy' component={CookiePopup} />
            <Route exact path='/'>
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
                                }
                            }
                        </AppContext.Consumer>
                    </GameProvider>
                </AppProvider>
            </Route>
            
            <Route path='/privacy' component={Privacy} />

        </Router>
    )
}

export default App
