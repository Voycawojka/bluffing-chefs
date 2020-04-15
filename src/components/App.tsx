import * as React from 'react'
import { useEffect } from 'react'
import { saveSomething } from '../firebase/api'

const App = () => {
    useEffect(() => {
        saveSomething()
    }, [])

    return (
        <h1>Halo halo</h1>
    )
}

export default App
