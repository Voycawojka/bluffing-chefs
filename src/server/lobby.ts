import { Player, players } from "./players"
import { queue } from "./queue"
import config from "../shared/config"
import { Game, games } from "./game"
import { Server } from "socket.io"

function tryCreateGame(io: Server) {
    if (queue.length >= config.minPlayers) {
        setTimeout(() => {
            const players = queue.retrievePlayers(config.minPlayers, config.maxPlayers)

            if (!players) {
                return
            }

            players.map(player => player.socket).forEach(socket => {
                socket.removeAllListeners('matchMaking/queue/join')
                socket.removeAllListeners('matchMaking/queue/size/request')
            })

            console.log(`Creating a new game with ${players.length} players [${players.map(player => player.username).join(',')}]`)

            const game = new Game(io, players)
            games.push(game)

            // TODO send game data
            game.emitToPlayers('matchMaking/joinedGame')
            queue.emitSize(io)
        }, config.waitTimeForMorePlayers)
    }
}

export function setupLobby(player: Player) {
    const socket = player.socket

    socket.on('matchMaking/queue/join', (username: string) => {
        console.log(`Player joined queue as ${username}`)

        players[socket.id].username = username
        queue.add(player)

        tryCreateGame(socket.server)

        socket.emit('matchMaking/queue/joined')
        queue.emitSize(socket.server)
    })

    socket.on('matchMaking/queue/size/request', () => {
        socket.emit('matchMaking/queue/size', queue.length)
    })
}
