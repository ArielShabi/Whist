import { PlayerCard } from './types';
import { UserInfo } from '../types';
import { cardPlayedType, requestCardType, roundWonType } from '../webSocketServer/messages/messageTypes'
import { User } from '../webSocketServer/userContainer/types';

const requestCard = (user: User): void => {
    user.connection.sendMessage(requestCardType);
};

const cardPlayed = (users: User[], playerCard: PlayerCard): void => {
    users.forEach((user) => {
        user.connection.sendMessage(cardPlayedType, playerCard);
    });
};

const roundWon = (users: User[], winningPlayer: UserInfo, board: PlayerCard[]): void => {
    const message = {
        winningPlayer,
        board
    };

    users.forEach((user) => {
        user.connection.sendMessage(roundWonType, message);
    });
};

export default {
    requestCard,
    cardPlayed,
    roundWon
};
