import { Player } from './players'
import { Server } from 'socket.io'

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

    emitSize(io: Server) {
        this.emitToWaitingPlayers(io, 'matchMaking/queue/size', this.length)
    }

    emitToWaitingPlayers(io: Server, event: string, ...args: any[]) {
        io.to(MatchQueue.room).emit(event, args)
    }
}
