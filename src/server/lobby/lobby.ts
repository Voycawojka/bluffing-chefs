import { Player, players, isUsernameTaken } from '../game/players'
import { queue } from './queue'
import config from '../../shared/config'
import { Game, games } from '../game/game'
import { Server } from 'socket.io'

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

            const game = new Game(io, players)
            games.push(game)

            game.emitToPlayers('matchMaking/joinedGame')
            queue.emitSize(io)
        }, config.waitTimeForMorePlayers)
    }
}

function makeUniqueUsername(original: string, num: number = 2): string {
    const unique = `${original} [${num}]`

    if (!isUsernameTaken(unique) && num !== 69) {
        return unique
    }

    return makeUniqueUsername(original, num + 1)
}

export function setupLobby(player: Player) {
    const socket = player.socket

    socket.on('matchMaking/queue/join', (username: string) => {
        if (isUsernameTaken(username) && players[socket.id].username !== username) {
            // TODO remove this and just forbid duplicate usernames (requires frontend work too)
            username = makeUniqueUsername(username)
        }

        players[socket.id].username = username
        queue.add(player)

        tryCreateGame(socket.server)

        socket.emit('matchMaking/queue/joined', username)
        queue.emitSize(socket.server)
    })

    socket.on('matchMaking/queue/size/request', () => {
        socket.emit('matchMaking/queue/size', queue.length)
    })
}
