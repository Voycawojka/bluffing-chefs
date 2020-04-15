import * as React from 'react'
import { useEffect } from 'react'
import * as api from '../firebase/api'

const App = () => {
    useEffect(() => {
        api.subscribeForRandomQueueSize(n => console.log(`Players in queue: ${n}`))
    }, [])

    useEffect(() => {
        api.joinRandomQueue(`test-user-${Date.now()}`)
    }, [])

    return (
        <h1>Halo halo</h1>
    )
}

export default App
