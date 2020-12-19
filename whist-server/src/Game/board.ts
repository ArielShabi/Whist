import { CardSuits, PlayerCard, PlayingUser } from './types';

const createBoard = (users: PlayingUser[], strongSuit: CardSuits) => {
    const cards: PlayerCard[] = [];

    const playCard = (card: PlayerCard): void => {
        const isSpaceTaken = cards.some(playerCard => playerCard.id === card.id);

        if (isSpaceTaken) {
            throw new Error(`Player all ready played card ${card}`);
        }

        cards.push(card);
    };

    const resetBoard = (): void => {
        cards.splice(0, cards.length);
    };

    const isBoardFull = (): boolean => {
        return cards.length === users.length;
    };

    const getRoundWinner = (): string => {
        if (!isBoardFull()) {
            throw new Error('Cannot decide on winner if board is not full');
        }

        const winner = cards.reduce((currentWinner, playerCard) => {
            if (currentWinner.suit === playerCard.suit) {
                return playerCard.number > currentWinner.number ? playerCard : currentWinner;
            }

            return playerCard.suit === strongSuit ? playerCard : currentWinner;
        }, cards[0]);

        return winner.id;
    };

    return {
        playCard,
        resetBoard,
        isBoardFull,
        getRoundWinner
    };
};

export default createBoard;
