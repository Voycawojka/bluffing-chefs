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

const Game = () => {
    const [currentDisplay, setCurrentDisplay] = useState(true)
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

        const renderItems = currentDisplay 
            ? <div className="items__list items__list--scrollable">  
                {gameContext.neededItems.map(item => <DisplayItem item={item} />)}
            </div>
            : <div className="items__list items__list--scrollable">
                {gameContext.allItems.map(item => <DisplayItem item={item} />)}
            </div>

        return (
            <div className='game'>
                <Chat />
                <div className='game__content'>
                    <div className="items__list">    
                        <Items items={gameContext.items} />
                    </div>

                    <div className='game__item-display'>
                        <button 
                            className={`game__button game__button--left game__button--left-${currentDisplay ? 'active' : 'inactive'}`}  
                            onClick={() => setCurrentDisplay(true)}
                        >
                        collect
                        </button>

                        <button 
                            className={`game__button game__button--right-${currentDisplay ? 'inactive' : 'active'}`}
                            onClick={() => setCurrentDisplay(false)}
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
