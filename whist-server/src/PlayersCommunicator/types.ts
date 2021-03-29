import { PlayerCard } from '../game/types';
import { UserInfo } from '../types';

export interface GamePlayerCommunicator {
    requestCard: (userId: UserInfo) => void,
    cardPlayed: (playerCard: PlayerCard) => void,
    roundWon: (winningPlayer: UserInfo) => void
}