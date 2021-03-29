import { UserInfo } from '../types';
import { SuitProposal, VotingRoutineCommunicator } from './types';

const votingRoutine = (players: UserInfo[], votingRoutineCommunicator: VotingRoutineCommunicator) => {
    const proposingPlayers = [...players];
    let highestProposal: SuitProposal;

    const proposalReceived = (player: UserInfo, proposal: SuitProposal) => {
        const removeProposingUser = () => {
            const proposingPlayerIndex = proposingPlayers.findIndex(proposingPlayer => proposingPlayer.id === player.id);
            proposingPlayers.slice(proposingPlayerIndex, 1);
            votingRoutineCommunicator.proposalPlaced(player, null);
        }

        if (!proposal) {
            removeProposingUser();
        }

        const isHigherProposal = proposal.number > highestProposal.number || (proposal.number === highestProposal.number && proposal.suit > highestProposal.suit);

        if (isHigherProposal) {
            votingRoutineCommunicator.proposalPlaced(player, proposal)
        }
        else {
            //ERROR
            removeProposingUser();
        }
    };

    return {
        proposalReceived
    };
};
