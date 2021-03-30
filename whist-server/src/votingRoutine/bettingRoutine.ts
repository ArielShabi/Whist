import { PlayerBet, SuitProposal, VotingRoutineCommunicator } from './types';
import { NUMBER_OF_CARDS_PER_SUIT } from '../consts';
import { UserInfo } from '../types';

const bettingRoutine = (players: UserInfo[], votingRoutineCommunicator: VotingRoutineCommunicator, winningProposal: SuitProposal) => {
    let playersBets: PlayerBet[] = [];

    const isBetLegit = (playerBet: PlayerBet) => {
        if (playerBet.bet < 0 || playerBet.bet > NUMBER_OF_CARDS_PER_SUIT) {
            return false;
        }

        if (playerBet.player === winningProposal.player && playerBet.bet < winningProposal.number) {
            return false;
        }

        if (playersBets.length === players.length - 1) {
            const totalBetCount = playersBets.reduce((total, bet) => total + bet.bet, 0);
            const evenBetCount = players.length * NUMBER_OF_CARDS_PER_SUIT;

            if (totalBetCount === evenBetCount) {
                return false;
            }
        }

        return true;
    };

    const startRoutine = () => {
        votingRoutineCommunicator.requestBet(winningProposal.player);
    };

    const betReceived = (playerBet: PlayerBet) => {
        if (!isBetLegit(playerBet)) {
            votingRoutineCommunicator.requestBet(playerBet.player);
            //ERROR
            return;
        }

        playersBets.push(playerBet);
        votingRoutineCommunicator.betPlaced(playerBet);

        if (playersBets.length === players.length) {
            //FINISH
        }

        const playerIndex = players.findIndex(player => player.id === playerBet.player.id);
        const nextBetter = players[(playerIndex + 1) % players.length];

        votingRoutineCommunicator.requestBet(nextBetter);
    };

    return {
        startRoutine,
        betReceived
    };
};

export default bettingRoutine;
