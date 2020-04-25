import { Player, players } from "./players";
import { Server } from "socket.io";
import { MessageType, UserMessage } from "../shared/model/message";
import { StartingData, ClaimItemRequest, ClaimItemSuccessResponse, OfferRequest, OfferErrorResponse, OfferSuccessResponse, CancelOfferResponse } from "../shared/model/game";
import { PlayersItem, KnownClaimedItem } from "../shared/model/item";
import { ClaimItemErrorResponse } from '../shared/model/game'
import { Market } from "./market";

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
    return from[Math.floor(Math.random() * from.length)]
}

function getRandomItems(ammount: number, from: string[] = availableItems): string[] {
    return Array.from({ length: ammount }).map(() => getRandomItem(from))
}

export class Game {
    private id: number
    private messages: MessageType[] = []
    private playerItems: { [username: string]: PlayersItem[] } = {}
    private neededItems: { [username: string]: string[] } = {}
    private allItems: string[] = []
    private market = new Market()

    constructor(private io: Server, private players: Player[]) {
        this.id = Date.now()

        players.forEach(player => {
            player.socket.join(this.roomName)
            
            const items = getRandomItems(5)
            this.playerItems[player.username] = items.map(item => ({ type: 'known-item', name: item }))
            this.allItems.push(...items)

            player.socket.on('game/sendMessage', (content: string) => {
                console.log(`${this.id} | [${player.username}] ${content}`)

                const message: UserMessage = {
                    type: 'user-message',
                    user: player.username,
                    time: Date.now(),
                    content
                }

                this.emitChatMessage(message)
            })

            player.socket.on('game/startingData/request', () => {
                player.socket.emit('game/startingData', this.startingDataForPlayer(player))
            })

            player.socket.on('game/claimItem', (req: ClaimItemRequest) => {
                if (!this.allItems.includes(req.asItem)) {
                    const response: ClaimItemErrorResponse = {
                        success: false,
                        errorMessage: `Cannot claim '${req.asItem}' because it's not in this game`
                    }

                    player.socket.emit('game/claimedItem', response)
                    return
                }

                const item: KnownClaimedItem = {
                    type: 'known-claimed-item',
                    name: this.playerItems[player.username][req.itemIndex].name,
                    claimedAs: req.asItem
                }

                this.playerItems[player.username][req.itemIndex] = item

                const response: ClaimItemSuccessResponse = {
                    success: true,
                    itemData: item
                }

                player.socket.emit('game/claimedItem', response)
                this.emitChatMessage({
                   type: 'item-declaration',
                   user: player.username,
                   time: Date.now(),
                   item: {
                       type: 'unknown-claimed-item',
                       claimedAs: item.claimedAs,
                       index: req.itemIndex
                   } 
                })
            })

            player.socket.on('game/makeOffer', (req: OfferRequest) => {
                const playerItem = this.playerItems[player.username][req.playerItemIndex]
                const opponentItem = this.playerItems[req.toPlayer][req.opponentItemIndex]

                if (!this.canBeExchanged(playerItem) || !this.canBeExchanged(opponentItem)) {
                    const response: OfferErrorResponse = {
                        success: false,
                        errorMessage: 'Provided items cannot be exchanged'
                    }

                    player.socket.emit('game/madeOffer', response)
                    return
                }

                const opponent = this.getPlayer(req.toPlayer)

                if (!opponent) {
                    const response: OfferErrorResponse = {
                        success: false,
                        errorMessage: `Player '${req.toPlayer}' isn't participating in this game`
                    }

                    player.socket.emit('game/madeOffer', response)
                    return
                }

                const offer = this.market.addOffer(player.username, req.toPlayer, req.playerItemIndex, req.opponentItemIndex)

                if (!offer) {
                    const response: OfferErrorResponse = {
                        success: false,
                        errorMessage: `Cannot make this offer, perhaps '${playerItem.name}' is already offered`
                    }

                    player.socket.emit('game/madeOffer', response)
                    return
                }

                const response: OfferSuccessResponse = {
                    success: true,
                    offerData: offer
                }

                player.socket.emit('game/madeOffer', response)
                opponent.socket.emit('game/gotOffer', offer)
            })

            player.socket.on('game/cancelOffer', (id: string) => {
                const offer = this.market.getOffer(id)
                const cancelled = this.market.cancelOffer(player.username, id)
                const response: CancelOfferResponse = cancelled 
                    ? { status: true }
                    : { status: false, errorMessage: `Cannot cancel offer '${id}, perhaps is wasn't made by the player or don't exist anymore` }

                if (offer) {
                    player.socket.emit('game/canceledOffer', id)
                    this.getPlayer(offer.to)?.socket.emit('game/canceledOffer', id)
                }
            })
        })

        players.forEach(player => {
            // TODO make sure starting and needed items aren't too overlapping
            this.neededItems[player.username] = getRandomItems(4, this.allItems)
        })
    }

    emitToPlayers(event: string, ...args: any[]): void {
        this.io.to(this.roomName).emit(event, ...args)
    }

    emitChatMessage(message: MessageType): void {
        this.messages.push(message)
        this.emitToPlayers('game/receivedMessage', message)
    }

    canBeExchanged(item: PlayersItem): boolean {
        return typeof item !== 'undefined' && item.type === 'known-claimed-item'
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

    private getPlayer(username: string): Player | undefined {
        return this.players.find(player => player.username === username)
    }
}

export const games: Game[] = []
