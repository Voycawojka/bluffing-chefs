import { Server } from 'socket.io'
import { MatchQueue } from './queue'
import { PlayerStore, Player } from './players'

const players: PlayerStore = {}
const queue: MatchQueue = new MatchQueue()

function setupLobby(player: Player) {
    const socket = player.socket

    socket.on('matchMaking/queue/join', (username: string) => {
        console.log(`Player joined queue as ${username}`)

        players[socket.id].username = username
        queue.add(player)

        socket.emit('matchMaking/queue/joined')
        queue.emitSize(socket.server)
    })

    socket.on('matchMaking/queue/size/request', () => {
        socket.emit('matchMaking/queue/size', queue.length)
    })
}

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
