import React, { useState } from 'react'

type Status = "start" | "queued" | "in-game"

interface ContextState {
    status: Status,
    setStatus: React.Dispatch<React.SetStateAction<Status>>
}

export const AppContext = React.createContext<ContextState>({} as ContextState)

const AppProvider = (
    props: {
        children: React.ReactNode
    }
) => {
    const [status, setStatus] = useState<Status>("start")

    return (
        <AppContext.Provider value={{
            status: status,
            setStatus: setStatus
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider
