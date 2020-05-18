import * as React from 'react'
import { useContext } from 'react'
import Cookies from 'js-cookie'
import * as api from '../../client/api'
import { stringInRange } from '../../shared/utils/constraintUtils'
import { useInputChange } from '../../hooks/useInputChange'
import { GameContext } from './../gameProvider/GameProvider'

function getOrCreateNickname(): string {
    const savedNickname = Cookies.get('nickname')

    if (savedNickname) {
        return savedNickname
    } else {
        return  `Chef-${Math.floor(Math.random() * 10000)}`
    }
}

const GameEnter = (
    props: {
        setInQueue: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {
    const gameContext = useContext(GameContext)

    const [ name, setName ] = useInputChange(15, getOrCreateNickname()) 

    function joinRandomQueue(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        api.joinRandomQueue(name)
            .then(() => {
                props.setInQueue(true)
                gameContext.setUserName(name)
                Cookies.set('nickname', name)
            })
    }

    return (
        <form className='game-enter' onSubmit={joinRandomQueue}>
            <input
                type='text'
                name='name'
                className='game-enter__input'
                value={name}
                placeholder='Username...'
                onChange={setName}
            />
            <input
                className='game-enter__button'
                type='submit'
                value='Play'
                disabled={!stringInRange(name, 3, 15)}
            />
        </form>
        
    )
}

export default GameEnter
