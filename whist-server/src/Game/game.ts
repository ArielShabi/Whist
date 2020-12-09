
import { PlayerCard, PlayingUser } from './types';

const game = (users: PlayingUser[]): void => {
    const board: PlayerCard[] = [];

    const playCard = (card: PlayerCard): string => {
        const isSpaceTaken = board.some(playerCard => playerCard.id === card.id);

        if (isSpaceTaken) {
            throw new Error(`Player all ready played card ${card}`);
        }

        board.push(card);
        const userSeatNumber = users.findIndex(user => user.id == card.id);
        const nextUser = users[(userSeatNumber + 1) % users.length];

        return nextUser.id;
    };


};

export default game
