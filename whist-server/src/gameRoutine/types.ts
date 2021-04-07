import { UserInfo } from '../types'

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

export type PlayingUser = UserInfo & {
    cards: Card[]
}

export type PlayerCard = Card & {
    player: UserInfo
}
