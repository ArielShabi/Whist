
import { CardSuits, PlayerCard, PlayingUser } from './types';

const game = (users: PlayingUser[], strongSuit: CardSuits): any => {
    const board: PlayerCard[] = [];

    const resetBoard = (): void => {
        board.splice(0, board.length);
    }

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

    const isBoardFull = (): boolean => {
        return board.length === users.length;
    };

    const getRoundWinner = (): string => {
        if (!isBoardFull()) {
            throw new Error('Cannot decide on winner if board is not full');
        }

        const winner = board.reduce((currentWinner, playerCard) => {
            if (currentWinner.suit === playerCard.suit) {
                return playerCard.number > currentWinner.number ? playerCard : currentWinner;
            }

            return playerCard.suit === strongSuit ? playerCard : currentWinner;
        }, board[0]);

        return winner.id;
    };

    return {
        resetBoard,
        playCard,
        isBoardFull,
        getRoundWinner
    };
};

export default game
