import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import Chat from '../chat/Chat'
import Items from '../items/Items'
import { GameContext } from '../gameProvider/GameProvider'
import DisplayItem from '../items/DisplayItem'
import Offers from '../offers/Offers'
import EndGame from '../endGame/EndGame'
import { Victory } from '../../shared/model/game'
import { registerVirtualPageView } from '../../utils/analytics'
import config from '../../shared/config'
import { sortAlphabeticaly } from '../../shared/utils/sortUtils'

enum Tab {
    Collect, Pool
}

const Game = () => {
    const [currentDisplay, setCurrentDisplay] = useState(Tab.Collect)
    const [endGameData, setEndGameData] = useState<Victory | null>(null)
    const gameContext = useContext(GameContext)
    
    useEffect(() => {
        api.getStartingData()
            .then(data => gameContext.setInitialData(data))

        api.onGameEnd()
            .then(data => setEndGameData(data))

        registerVirtualPageView('in game')
    }, [])

    if (Array.isArray(gameContext.allItems) && gameContext.allItems.length) {

        const renderEnemies = gameContext.opponents.map(opponent =>
            <div className='game__enemy'>
                <p className='game__enemy-name'>{opponent.name}</p>
                <div className="items__list items__list--enemy-list">
                    <Items items={opponent.items}/>
                </div>
            </div> 
        )

        const renderItems = currentDisplay === Tab.Collect
            ? <div className="items__list">  
                {gameContext.neededItems.map(item => <DisplayItem item={item} />)}
            </div>
            : <div className="items__list items__list--scrollable">
                {gameContext.allItems.sort(sortAlphabeticaly).map(item => <DisplayItem item={item} />)}
            </div>

        return (
            <div className='game'>
                <Chat firstPrompt={{ type: 'prompt', content: config.welcomePrompt }} />
                <div className='game__content'>
                    <div className="items__list">    
                        <Items items={gameContext.items} />
                    </div>

                    <div className='game__item-display'>
                        <button 
                            className={`game__button game__button--left game__button--left-${currentDisplay === Tab.Collect ? 'active' : 'inactive'}`}  
                            onClick={() => setCurrentDisplay(Tab.Collect)}
                        >
                        collect
                        </button>

                        <button 
                            className={`game__button game__button--right-${currentDisplay === Tab.Pool ? 'active' : 'inactive'}`}
                            onClick={() => setCurrentDisplay(Tab.Pool)}
                        >
                        pool
                        </button>
                        {renderItems}
                    </div>

                    <div className='game__container'>
                        <Offers />
                        <div className='game__enemies'>
                            {renderEnemies}
                        </div>
                    </div>
                </div>

                {endGameData ? <EndGame endData={endGameData} /> : null}
            </div>
        )
    } else {
        return null
    }

}

export default Game
