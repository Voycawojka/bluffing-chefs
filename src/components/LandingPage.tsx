import * as React from 'react'
import { useEffect, useState } from 'react'
import * as api from '../firebase/api'
import { stringInRange } from '../utils/constraintUtils'

const LandingPage = (
    props: {
        setEntered: () => void
    }
) => {
    const [ name, setName ] = useState<string>('') 

    function joinRandomQueue() {
        api.joinRandomQueue(name)
        props.setEntered()
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length <= 15) {
            setName(event.target.value)
        }
    }

    return (
        <div className='landing-page'>
            <p>Select Your Name</p>
            <form onSubmit={joinRandomQueue}>
                <input
                    type='text'
                    value={name}
                    placeholder='enter username...'
                    onChange={handleChange}
                />
                <input
                    type='submit'
                    value='find game'
                    disabled={!stringInRange(name, 3, 15)}
                />
            </form>
        </div>
    )
}

export default LandingPage
