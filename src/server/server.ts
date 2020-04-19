import express from 'express'
import socketIo, { Socket } from 'socket.io'

const http = express()

http.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
const server = http.listen(port, () => console.log(`Listening on *:${port}`))
const io = socketIo(server)

interface PlayerList { 
    [x: string]: 
    { 
        socket: Socket,
        username: string
    } 
}

const players: PlayerList = {}
let queue: string[] = []

io.on('connection', (socket) => {
    console.log('New player connected')

    players[socket.id] = { 
        socket,
        username: `Guest-${Math.random() * 1000}` 
    }

    socket.on('disconnect', () => {
        console.log('Player disconnected')

        queue = queue.filter(id => id !== socket.id)
        delete players[socket.id]
        
        queue
            .map(id => players[id])
            .map(player => player.socket)
            .forEach(socket => {
                socket.emit('matchMaking/queue/size', queue.length)
            })
    })
    
    socket.on('matchMaking/queue/join', (username: string) => {
        console.log(`Player joined queue as ${username}`)

        players[socket.id].username = username
        queue.push(socket.id)

        queue
        .map(id => players[id])
        .map(player => player.socket)
        .forEach(socket => {
            socket.emit('matchMaking/queue/size', queue.length)
        })

        socket.emit('matchMaking/queue/joined')
    })

    socket.on('matchMaking/queue/size/request', () => {
        socket.emit('matchMaking/queue/size', queue.length)
    })
})
