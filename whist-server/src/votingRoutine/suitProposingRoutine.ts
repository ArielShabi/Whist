import { UserInfo } from '../types';
import { SuitProposal, VotingRoutineCommunicator } from './types';

const createSuitProposingRoutine = (players: UserInfo[], votingRoutineCommunicator: VotingRoutineCommunicator) => {
    const proposingPlayers = [...players];
    let highestProposal: SuitProposal;

    const startRoutine = () => {
        votingRoutineCommunicator.requestProposal(players[0]);
    };

    const proposalReceived = (proposal: SuitProposal) => {
        const proposingPlayerIndex = proposingPlayers.findIndex(proposingPlayer => proposingPlayer.id === proposal.player.id);

        const removeProposingUser = () => {
            proposingPlayers.slice(proposingPlayerIndex, 1);
            votingRoutineCommunicator.proposalPlaced({ ...proposal, number: -1 });

            if (proposingPlayers.length === 1) {
                //FINISH
            }
        }

        if (!proposal) {
            removeProposingUser();
        }
        else {
            const isHigherProposal = proposal.number > highestProposal.number || (proposal.number === highestProposal.number && proposal.suit > highestProposal.suit);

            if (isHigherProposal) {
                highestProposal = proposal;
                votingRoutineCommunicator.proposalPlaced(proposal);
            }
            else {
                //ERROR
                removeProposingUser();
            }
        }

        const nextProposer = proposingPlayers[(proposingPlayerIndex + 1) % proposingPlayers.length];
        votingRoutineCommunicator.requestProposal(nextProposer);
    };

    return {
        startRoutine,
        proposalReceived
    };
};

export default createSuitProposingRoutine;
