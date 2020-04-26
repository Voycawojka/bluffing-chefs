import { Server } from 'socket.io'
import { queue } from './lobby/queue'
import { Player, players } from './game/players'
import { setupLobby } from './lobby/lobby'

export function setupSockets(io: Server) {
    io.on('connection', (socket) => {
        console.log('New player connected')
    
        const player: Player = {
            socket,
            username: `Guest-${Math.random() * 1000}`
        }
        players[socket.id] = player
    
        socket.on('disconnect', () => {
            console.log('Player disconnected')
    
            queue.remove(player)
            delete players[socket.id]
            
            queue.emitSize(io)
        })

        setupLobby(player)
    })
}
