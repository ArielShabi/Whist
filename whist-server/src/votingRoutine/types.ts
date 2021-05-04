import { UserInfo } from '../types';
import { CardSuits } from '../gameRoutine/types';

export interface VotingRoutineCommunicator {
    requestBet: (user: UserInfo) => void,
    betPlaced: (bet: PlayerBet) => void,
    requestProposal: (user: UserInfo) => void,
    proposalPlaced: (proposal: SuitProposal) => void,
}

export type SuitProposal = {
    player: UserInfo,
    number: number,
    suit: CardSuits
};


export type PlayerBet = {
    player: UserInfo,
    bet: number;
};
