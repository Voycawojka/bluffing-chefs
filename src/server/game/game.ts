import availableItems from "../data/items.json"
import { Player, InGamePlayer } from "./players";
import { Server } from "socket.io";
import { MessageType, UserMessage } from "../../shared/model/message";
import { StartingData, ClaimItemRequest, ClaimItemSuccessResponse, OfferRequest, OfferSuccessResponse, CancelOfferResponse, ErrorResponse, RejectOfferResponse, AcceptOfferResponse, Victory } from "../../shared/model/game";
import { KnownClaimedItem, UnknownClaimedItem, Indexed, KnownItem } from "../../shared/model/item";
import { Market } from "./market";
import { getRandomItems, Item } from "./items";

export class Game {
    private id: number
    private messages: MessageType[] = []
    private players: InGamePlayer[]
    private allItems: string[] = []
    private market = new Market()

    constructor(private io: Server, players: Player[]) {
        this.id = Date.now()
        this.players = players.map(player => new InGamePlayer(player))

        this.players.forEach(player => {
            player.socket.join(this.roomName)
            
            const items = getRandomItems(5, availableItems, false)
            player.items.set(items)
            this.allItems.push(...items)

            this.setupChat(player)
            this.setupGameData(player)
            this.setupClaiming(player)
            this.setupOffers(player)            
        })

        this.players.forEach(player => {
            // TODO make sure starting and needed items aren't too overlapping
            player.neededItems = getRandomItems(4, this.allItems, true)
        })
    }

    emitToPlayers(event: string, ...args: any[]): void {
        this.io.to(this.roomName).emit(event, ...args)
    }

    emitChatMessage(message: MessageType): void {
        this.messages.push(message)
        this.emitToPlayers('game/receivedMessage', message)
    }

    canBeExchanged(item: Item | undefined): boolean {
        return typeof item !== 'undefined' && item.isClaimed
    }

    private startingDataForPlayer(player: InGamePlayer): StartingData {
        return {
            items: player.items.asKnown(),
            neededItems: player.neededItems,
            allItems: this.allItems,
            players: this.players.map(p => p.username)
        }
    }

    private get roomName(): string {
        return `room-${this.id}`
    }

    private getPlayer(username: string | undefined): InGamePlayer | undefined {
        return !!username
            ? this.players.find(player => player.username === username)
            : undefined
    }

    private respondWithError(player: Player, event: string, message: string): void {
        const response: ErrorResponse = {
            success: false,
            errorMessage: message
        }

        player.socket.emit(event, response)
    }

    private handlePossibleVictory(): void {
        const winners = [];

        for (const player of this.players) {
            let won = player.neededItems.every(neededItem => player.items.contains(neededItem))

            if (won) {
                winners.push(player);
            }
        }

        if (winners.length > 0) {
            const victory: Victory = {
                victors: winners.map(winner => ({ username: winner.username, neededItems: winner.neededItems }))
            }
            this.emitToPlayers('game/end', victory)
            games.splice(games.indexOf(this), 1);
        }
    }

    private setupChat(player: InGamePlayer): void {
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
    }

    private setupGameData(player: InGamePlayer): void {
        player.socket.on('game/startingData/request', () => {
            player.socket.emit('game/startingData', this.startingDataForPlayer(player))
        })
    }

    private setupClaiming(player: InGamePlayer): void {
        player.socket.on('game/claimItem', (req: ClaimItemRequest) => {
            if (!this.allItems.includes(req.asItem)) {
                this.respondWithError(player, 'game/claimedItem', `Cannot claim '${req.asItem}' because it's not in this game`)
                return
            }

            const item = player.items.get(req.itemIndex)

            item.claimAs(req.asItem)

            const response: ClaimItemSuccessResponse = {
                success: true,
                itemData: item.asKnown() as KnownClaimedItem
            }

            player.socket.emit('game/claimedItem', response)
            this.emitChatMessage({
                type: 'item-declaration',
                user: player.username,
                time: Date.now(),
                item: item.asUnknownIndexed(req.itemIndex) as UnknownClaimedItem & Indexed
            })
        })
    }

    private setupOffers(player: InGamePlayer): void {
        player.socket.on('game/makeOffer', (req: OfferRequest) => {
            const opponent = this.getPlayer(req.toPlayer)

            if (!opponent) {
                this.respondWithError(player, 'game/madeOffer', `Player '${req.toPlayer}' isn't participating in this game`)
                return
            }

            const playerItem = player.items.get(req.playerItemIndex)
            const opponentItem = opponent.items.get(req.opponentItemIndex)

            if (!this.canBeExchanged(playerItem) || !this.canBeExchanged(opponentItem)) {
                this.respondWithError(player, 'game/madeOffer', 'Provided items cannot be exchanged')
                return
            } 

            const offer = this.market.addOffer(player.username, req.toPlayer, req.playerItemIndex, req.opponentItemIndex)

            if (!offer) {
                this.respondWithError(player, 'game/madeOffer', `Cannot make this offer, perhaps '${playerItem.name}' is already offered`)
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

            if (!offer || !cancelled) {
                this.respondWithError(player, 'game/canceledOwnOffer', `Cannot cancel offer '${id}, perhaps is wasn't made by the player or doesn't exist anymore`)
                return
            }

            const response: CancelOfferResponse = { 
                success: true,
                id
            }

            player.socket.emit('game/canceledOwnOffer', response)
            this.getPlayer(offer.to)?.socket.emit('game/canceledOffer', response)
        })

        player.socket.on('game/rejectOffer', (id: string) => {
            const offer = this.market.getOffer(id)
            const rejected = this.market.rejectOffer(player.username, id)

            if (!offer || !rejected) {
                this.respondWithError(player, 'game/rejectedOwnOffer', `Cannot reject offer '${id}, perhaps is wasn't for the player or doesn't exist anymore`)
                return
            }

            const response: RejectOfferResponse = {
                success: true,
                id
            }

            player.socket.emit('game/rejectedOwnOffer', response)
            this.getPlayer(offer.from)?.socket.emit('game/rejectedOffer', response)
        })

        player.socket.on('game/acceptOffer', (id: string) => {
            const offer = this.market.getOffer(id)
            const accepted = this.market.acceptOffer(player.username, id)
            const opponent = this.getPlayer(offer?.from)
            
            if (!offer || !accepted || !opponent) {
                this.respondWithError(player, 'game/acceptedOwnOffer', `Cannot accept offer '${id}', perhabs it wasn't for the player or doesn't exist anymore`)
                return
            }

            const playerItem = player.items.get(offer.forItemIndex)
            const opponentItem = opponent.items.get(offer.offeredItemIndex)

            const playerResponse: AcceptOfferResponse = {
                success: true,
                id,
                gotItem: opponentItem.asKnown() as KnownItem
            }

            const opponentResponse: AcceptOfferResponse = {
                success: true,
                id,
                gotItem: playerItem.asKnown() as KnownItem
            }

            const chatMessage: MessageType = {
                type: 'transaction',
                user1: {
                    name: opponent.username,
                    item: opponentItem.asUnknownIndexed(offer.offeredItemIndex) as UnknownClaimedItem & Indexed
                },
                user2: {
                    name: player.username,
                    item: playerItem.asUnknownIndexed(offer.forItemIndex) as UnknownClaimedItem & Indexed
                }
            }

            player.items.exchange(offer.forItemIndex, opponent.items, offer.offeredItemIndex)

            player.socket.emit('game/acceptedOwnOffer', playerResponse)
            opponent.socket.emit('game/acceptedOffer', opponentResponse)
            this.emitChatMessage(chatMessage)

            this.handlePossibleVictory();
        })
    }
}

export const games: Game[] = []
