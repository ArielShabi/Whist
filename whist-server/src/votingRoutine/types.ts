import { UserInfo } from '../types';
import { CardSuits } from '../game/types';

export interface VotingRoutineCommunicator {
    requestBet: (user: UserInfo) => void,
    betPlaced: (bettingUser: UserInfo, bet: number) => void,
    requestProposal: (user: UserInfo) => void,
    proposalPlaced: (proposingUser: UserInfo, proposal?: SuitProposal) => void,
}

export type SuitProposal = {
    number: number,
    suit: CardSuits
}
