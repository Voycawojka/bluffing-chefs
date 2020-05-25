import express from 'express'
import socketIo from 'socket.io'
import { setupSockets } from './sockets'
import path from 'path'

const http = express()

http.use(express.static(__dirname + '/../public'))
http.get('*', (_req, res) => res.sendFile(path.resolve(__dirname + '/../public/index.html')))

const port = process.env.PORT || 3000
// eslint-disable-next-line no-console
const server = http.listen(port, () => console.log(`Listening on *:${port}`))
const io = socketIo(server)

setupSockets(io)
