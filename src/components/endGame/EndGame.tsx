import * as React from 'react'
import { Victory } from '../../shared/model/game'
import { useContext } from 'react'
import { GameContext } from '../gameProvider/GameProvider'
import Victor from './Victor'
import { AppContext } from '../appProvider/AppProvider'
 
const EndGame = (
    props: {
        endData: Victory
    }
) => {

    const appContext = useContext(AppContext)
    const gameContext = useContext(GameContext)
    const isVictor = !!props.endData.victors.find(victor => victor.username === gameContext.userName)

    const renderVictors = props.endData.victors.map(victor => 
        <Victor data={victor} key={victor.username}/>
    )

    return (
        <div className='end-game'>
            <div className='end-game__content'>
                <p className='end-game__result'>
                    <span>you have </span>
                    {
                        isVictor 
                            ? <span className='end-game__result-positive'>won</span> 
                            : <span className='end-game__result-negative'>lost</span>
                    }
                </p>
                {renderVictors}

                <button 
                    onClick={() => appContext.setStatus('start')}
                    className='end-game__back-button'
                >
                back to menu
                </button>
            </div>
        </div>
    )
}

export default EndGame
