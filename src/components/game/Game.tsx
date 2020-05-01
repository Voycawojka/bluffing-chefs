import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import Chat from '../chat/Chat'
import Items from '../items/Items'
import { KnownItem } from '../../shared/model/item'
import { GameContext } from '../gameProvider/GameProvider'
import DisplayItem from '../items/DisplayItem'
import Offers from '../offers/Offers'

const Game = () => {
    const gameContext = useContext(GameContext)
    
    useEffect(() => {
        api.getStartingData()
            .then(data => gameContext.setInitialData(data))
    }, [])

    if (gameContext.allItems !== []) {

        const renderEnemies = gameContext.opponents.map(opponent => 
            <div className="items__list">
                {opponent.name}
                <Items items={opponent.items}/>
            </div>
        )

        return (
            <div className='game'>
               ingame
                <Chat />

               All Items:
                <div className="items__list">  
                    {gameContext.allItems.map(item => <DisplayItem item={item} />)}
                </div>

                My Items:
                <div className="items__list">    
                    <Items items={gameContext.items} />
                </div>

               Needed Items:
                <div className="items__list">
                    {gameContext.neededItems.map(item => <DisplayItem item={item} />)}
                </div>

                Enemies:
                {renderEnemies}

                <Offers />
            </div>
        )
    } else {
        return null
    }

}

export default Game
