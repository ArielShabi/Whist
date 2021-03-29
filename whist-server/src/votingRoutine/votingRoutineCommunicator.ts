import { PlayerBet, SuitProposal, VotingRoutineCommunicator } from './types';
import { UserInfo } from '../types';
import { UserContainer } from '../webSocketServer/userContainer/types';
import { BET_PLACED, PROPOSAL_PLACED, REQUEST_BET, REQUEST_PROPOSAL } from '../webSocketServer/messages/messageTypes';

const votingRoutineCommunicator = (users: UserContainer): VotingRoutineCommunicator => {
    const requestBet = (user: UserInfo) => {
        users.getUser(user.id).connection.sendMessage(REQUEST_BET);
    };

    const betPlaced = (bet: PlayerBet) => {
        users.getAllOpenUsers().forEach(user => {
            user.connection.sendMessage(BET_PLACED, bet);
        });
    };

    const requestProposal = (user: UserInfo) => {
        users.getUser(user.id).connection.sendMessage(REQUEST_PROPOSAL);
    };

    const proposalPlaced = (suitProposal: SuitProposal) => {
        users.getAllOpenUsers().forEach(user => {
            user.connection.sendMessage(PROPOSAL_PLACED, suitProposal);
        });
    };

    return {
        requestBet,
        betPlaced,
        requestProposal,
        proposalPlaced
    };
};

export default votingRoutineCommunicator;
