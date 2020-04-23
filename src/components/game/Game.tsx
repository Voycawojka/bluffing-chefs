import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import { StartingData } from '../../shared/model/game'
import Chat from '../chat/Chat'

const Game = () => {
    const [data, setData] = useState<StartingData | null>(null)

    useEffect(() => {
        api.getStartingData(data => {
            console.log(data)
            setData(data)
        })
    }, [])

    return (
       <div className='game'>
          ingame
          <Chat />
       </div>
    )
}

export default Game
