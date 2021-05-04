import { PlayerCard } from '../gameRoutine/types';
import { GamePlayerCommunicator } from './types';
import { UserInfo } from '../types';
import { cardPlayedType, requestCardType, roundWonType } from '../webSocketServer/messages/messageTypes'
import { UserContainer } from '../webSocketServer/userContainer/types';

const gamePlayerCommunicator = (users: UserContainer): GamePlayerCommunicator => {
    const requestCard = (user: UserInfo): void => {
        users.getUser(user.id).connection.sendMessage(requestCardType);
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
