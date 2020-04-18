import * as React from 'react'
import { useEffect } from 'react'
import * as api from '../firebase/api'

const Lobby = (
    props: {
        playerAmount: number
    }
) => {

    return (
        <div className='lobby'>
            <p>Waiting for players: {props.playerAmount}/4</p>
        </div>
    )
}

export default Lobby
