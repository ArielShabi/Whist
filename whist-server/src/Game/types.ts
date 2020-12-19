import { UserInfo } from '../types'
import { User } from '../webSocketServer/userContainer/types'

export enum CardSuits {
    Club,
    Diamond,
    Spade,
    Heart
}

export type Card = {
    number: number;
    suit: CardSuits
}

export type PlayingUser = User & {
    cards: Card[]
}

export type PlayerCard = Card & {
    player: UserInfo
}
