import express from 'express'
import socketIo from 'socket.io'
import { setupSockets } from './sockets'

const http = express()

http.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
const server = http.listen(port, () => console.log(`Listening on *:${port}`))
const io = socketIo(server)

setupSockets(io)
