import { Player } from './players'
import { Server } from 'socket.io'
import { inRange } from '../shared/utils/constraintUtils'
import { getFirstN } from '../shared/utils/iteratorUtils'

export class MatchQueue {
    private static room = 'queue'

    private queue: Set<Player> = new Set()

    add(player: Player): void {
        this.queue.add(player)
        player.socket.join(MatchQueue.room)
    }

    remove(player: Player): void {
        this.queue.delete(player)
        player.socket.leave(MatchQueue.room)
    }

    get length(): number {
        return this.queue.size
    }

    emitSize(io: Server): void {
        this.emitToWaitingPlayers(io, 'matchMaking/queue/size', this.length)
    }

    emitToWaitingPlayers(io: Server, event: string, ...args: any[]): void {
        io.to(MatchQueue.room).emit(event, args)
    }

    retrievePlayers(minAmmount: number, maxAmmount: number): Player[] | null {
        if (!inRange(minAmmount, 1, Math.min(maxAmmount, this.length))) {
            return null
        }

        const players = getFirstN(this.queue.values(), maxAmmount)
        players.forEach(player => this.remove(player))

        return players
    }
}

export const queue: MatchQueue = new MatchQueue()
