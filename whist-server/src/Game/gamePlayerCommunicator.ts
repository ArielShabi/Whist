import { PlayerCard } from './types';
import { UserInfo } from '../types';
import { cardPlayedType, requestCardType, roundWonType } from '../webSocketServer/messages/messageTypes'
import { User, UserContainer } from '../webSocketServer/userContainer/types';

const gamePlayerCommunicator = (users: UserContainer) => {

    const requestCard = (userId: string): void => {
        users.getUser(userId).connection.sendMessage(requestCardType);
    };

    const cardPlayed = (playerCard: PlayerCard): void => {
        users.getAllOpenUsers().forEach((user) => {
            user.connection.sendMessage(cardPlayedType, playerCard);
        });
    };

    const roundWon = (winningPlayer: UserInfo): void => {
        users.getAllOpenUsers().forEach((user) => {
            user.connection.sendMessage(roundWonType, winningPlayer);
        });
    };

    return {
        requestCard,
        cardPlayed,
        roundWon
    };
};

export default gamePlayerCommunicator;
