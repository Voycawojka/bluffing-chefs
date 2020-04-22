import { Player, players } from "./players";
import { Server } from "socket.io";
import { MessageType, UserMessage } from "../shared/model/message";
import { StartingData } from "../shared/model/game";

// TODO seperate manager for items
const availableItems = [
    'flour', 'salt', 'baking powder', 'baking soda', 'butter',
    'sugar', 'egg', 'vanilla', 'cheese', 'sprinkles',
    'rice', 'fish', 'ham', 'soy sauce', 'seaweed',
    'apple', 'orange', 'avocado', 'mango', 'kiwi',
    'sausage', 'bread', 'baguette', 'watermelon', 'pepper',
    'chili', 'pasta', 'yogurt', 'milk', 'frosting'
]

function getRandomItem(from: string[] = availableItems): string {
    return availableItems[Math.floor(Math.random() * from.length)]
}

function getRandomItems(ammount: number, from: string[] = availableItems): string[] {
    return Array(ammount).map(() => getRandomItem(from))
}

export class Game {
    private id: number
    private messages: MessageType[] = []
    private playerItems: { [username: string]: string[] } = {}
    private neededItems: { [username: string]: string[] } = {}
    private allItems: string[] = []

    constructor(private io: Server, private players: Player[]) {
        this.id = Date.now()

        players.forEach(player => {
            player.socket.join(this.roomName)
            
            const items = getRandomItems(5)
            this.playerItems[player.username] = items
            this.allItems.push(...items)

            player.socket.on('game/sendMessage', (content: string) => {
                console.log(`${this.id} | [${player.username}] ${content}`)

                const message: UserMessage = {
                    type: 'user-message',
                    user: player.username,
                    time: Date.now(),
                    content
                }

                this.messages.push(message)
                this.emitToPlayers('game/receivedMessage', message)
            })

            player.socket.on('game/startingData/request', () => {
                player.socket.emit('game/startingData', this.startingDataForPlayer(player))
            })

            player.socket.on('game/claimItem', (index: number, asItem: string) => {
                // TODO claiming items
            })

            // TODO rest of the formal actions
        })

        players.forEach(player => {
            // TODO make sure starting and needed items aren't too overlapping
            this.neededItems[player.username] = getRandomItems(4, this.allItems)
        })
    }

    emitToPlayers(event: string, ...args: any[]): void {
        this.io.to(this.roomName).emit(event, args)
    }

    private startingDataForPlayer(player: Player): StartingData {
        return {
            items: this.playerItems[player.username],
            neededItems: this.neededItems[player.username],
            allItems: this.allItems,
            players: this.players.map(p => p.username)
        }
    }

    private get roomName(): string {
        return `room-${this.id}`
    }
}

export const games: Game[] = []
